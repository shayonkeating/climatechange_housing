#!/usr/bin/env python3
"""
Script will run the ML model for climate change on whatever is requested for it

Author: Shayon Keating
Date: February 11, 2024
"""

# import reqs
import numpy as np
import pandas as pd
import os
import warnings
from statsmodels.tsa.statespace.sarimax import SARIMAX
from statsmodels.tsa.seasonal import seasonal_decompose 
warnings.simplefilter("ignore")
from math import sqrt
from matplotlib.ticker import StrMethodFormatter

# constants to not change
num_heating_days_state = pd.read_csv('processed_data/num_heating_days_state.csv')
num_cooling_days_state = pd.read_csv('processed_data/num_cooling_days_state.csv')
preciptation_state = pd.read_csv('processed_data/preciptation_state.csv')
temperature_avg_state = pd.read_csv('processed_data/temperature_avg_state.csv')
temperature_max_state = pd.read_csv('processed_data/temperature_max_state.csv')
temperature_min_state = pd.read_csv('processed_data/temperature_min_state.csv')
# make the data frame
num_heating_days_state = pd.DataFrame(num_heating_days_state)
num_cooling_days_state = pd.DataFrame(num_cooling_days_state)
preciptation_state = pd.DataFrame(preciptation_state)
temperature_avg_state = pd.DataFrame(temperature_avg_state)
temperature_max_state = pd.DataFrame(temperature_max_state)
temperature_min_state = pd.DataFrame(temperature_min_state)

def select_data(df, val1, val2):
    """Helper function to match the State Name and County"""
    result = df[(df["StateName"] == val1) & (df["name"].str.contains(val2 + " County"))]
    if result.empty:
        return "Error no matching data was found"
    else:
        return result

def basic_stats(df, year, *columns):
    """Function calculates mean and std dev, then uses that to calcualte z-scores to find how far
    from the mean each value is, will return the z-scores"""
    relevant_df = df[['year'] + list(columns)]
    stats = relevant_df.describe().loc[['mean', 'std']]
    z_scores = (relevant_df.drop(columns=['year']) - stats.loc['mean']) / stats.loc['std']
    z_scores['year'] = relevant_df['year']
    cols = ['year'] + list(columns)
    z_scores = z_scores[cols]
    return z_scores

def prep_time_series(df, value_name='value'):
    """Transform to a time series with a single column."""
    df_long = df.melt(id_vars=['year'], var_name='month', value_name=value_name)
    month_to_num = {'jan': 1, 'feb': 2, 'mar': 3, 'apr': 4, 'may': 5, 'jun': 6,
                    'jul': 7, 'aug': 8, 'sept': 9, 'oct': 10, 'nov': 11, 'dec': 12}
    df_long['month'] = df_long['month'].map(month_to_num)
    df_long['date'] = pd.to_datetime(df_long[['year', 'month']].assign(DAY=1))
    df_long = df_long.sort_values('date')
    df_long.set_index('date', inplace=True)
    df_long.drop(['year', 'month'], axis=1, inplace=True)
    return df_long

def process_and_model(df, value_name='value'):
    """Process the dataframe and apply the SARIMAX model to calculate the slope."""
    df_prep = prep_time_series(df, value_name)

    Train = df_prep[df_prep.index.year < 1980].reset_index() # split at 1980
    Valid = df_prep[df_prep.index.year >= 1980].reset_index()

    window_size = 12 # set window size for a period of 12 for the year
    for dataset in [Train, Valid]:
        dataset['rolling_mean'] = dataset[value_name].rolling(window=window_size).mean().fillna(0)
        dataset['rolling_std'] = dataset[value_name].rolling(window=window_size).std().fillna(0)
    
    # Fit SARIMAX model
    model = SARIMAX(Train[value_name], exog=Train[['rolling_mean', 'rolling_std']], 
                    order=(1, 0, 1), seasonal_order=(1, 1, 1, 12))
    results = model.fit()

    predictions = results.get_prediction(start=Valid.index[0], end=Valid.index[-1], 
                                         exog=Valid[['rolling_mean', 'rolling_std']])
    Valid['predictions'] = predictions.predicted_mean

    slope = calculate_slope_from_predictions(Valid, value_name)

    return slope

def calculate_slope_from_predictions(Valid, value_name):
    """Calculate the slope from SARIMAX model predictions."""
    last_test_date = Valid['date'].iloc[-1]
    prediction_dates = pd.date_range(start=last_test_date + pd.Timedelta(days=1), periods=len(Valid), freq='MS')
    prediction_dates_ordinal = np.array([d.toordinal() for d in prediction_dates])
    slope, intercept = np.polyfit(prediction_dates_ordinal, Valid['predictions'], 1)
    return slope

weights = {
    'heater_z': 25,
    'cooler_z': 25,
    'precip_z': 17.5,
    'temp_a_z': 20,
    'temp_max_z': 6.25,
    'temp_min_z': 6.25
}

def main(state, county):
    # Use the provided state and county to select data
    heat = select_data(num_heating_days_state, state, county)
    cool = select_data(num_cooling_days_state, state, county)
    precip = select_data(preciptation_state, state, county)
    temp_a = select_data(temperature_avg_state, state, county)
    temp_max = select_data(temperature_max_state, state, county)
    temp_min = select_data(temperature_min_state, state, county)
    
    # Analysis part remains the same, now uses the filtered data based on state and county
    datasets = [heat, cool, precip, temp_a, temp_max, temp_min]
    dataset_names = ['heater_z', 'cooler_z', 'precip_z', 'temp_a_z', 'temp_max_z', 'temp_min_z']
    slope_values = {name: process_and_model(pd.DataFrame(basic_stats(dataset, "year", "jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sept", "oct", "nov", "dec")).fillna(0), 'z-score') for dataset, name in zip(datasets, dataset_names)}

    # The rest of the calculation for composite metric
    max_slope = max(abs(slope) for slope in slope_values.values())
    composite_metric = sum((abs(slope_values[name]) / max_slope) * 100 * (weights[name] / 100) for name in dataset_names)
    composite_metric = min(composite_metric, 100)

    # Print out the composite metric and slope values
    print(f"Composite Metric for Climatological Stability {county}, {state}: {composite_metric:.2f}")
    for name, slope in slope_values.items():
        print(f"{name} Slope: {slope:.10f}")

if __name__ == "__main__":
    state = input("Enter the state: ")
    county = input("Enter the county: ")
    main(state, county)