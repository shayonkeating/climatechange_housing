#!usr/bin/env python
"""
This processes all the data into loadable data frames that can \
be accessed later
"""
# import reqs
import pandas as pd

def select_data(df, val1, val2):
    """Helper function to match the State Name and County"""
    result = df[(df["StateName"] == val1) & (df["name"].str.contains(val2 + " County"))]
    if result.empty:
        return "Error no matching data was found"
    else:
        return result
    
def basic_stats(df, year, *columns):
    """Function calculates mean and std dev, then uses that to calcualte z-scores to find how far \
    from the mean each value is, will return the z-scores"""
    relevant_df = df[['year'] + list(columns)]
    stats = relevant_df.describe().loc[['mean', 'std']]
    z_scores = (relevant_df.drop(columns=['year']) - stats.loc['mean']) / stats.loc['std']
    z_scores['year'] = relevant_df['year']
    cols = ['year'] + list(columns)
    z_scores = z_scores[cols]
    return z_scores

# read the csv
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

# apply select data function to get the proper values
heat = select_data(num_heating_days_state, "v1", "v2")
cool = select_data(num_cooling_days_state, "v1", "v2")
precip = select_data(preciptation_state, "v1", "v2")
temp_a = select_data(temperature_avg_state, "v1", "v2")
temp_max = select_data(temperature_max_state, "v1", "v2")
temp_min = select_data(temperature_min_state, "v1", "v2")

# applying basic stats to get the z scores for it
heater_z = pd.DataFrame(basic_stats(heat, "year", "jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sept", "oct", "nov", "dec")).fillna(0)
cooler_z = pd.DataFrame(basic_stats(cool, "year", "jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sept", "oct", "nov", "dec")).fillna(0)
precip_z = pd.DataFrame(basic_stats(precip, "year", "jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sept", "oct", "nov", "dec")).fillna(0)
temp_a_z = pd.DataFrame(basic_stats(temp_a, "year", "jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sept", "oct", "nov", "dec")).fillna(0)
temp_max_z = pd.DataFrame(basic_stats(temp_max, "year", "jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sept", "oct", "nov", "dec")).fillna(0)
temp_min_z = pd.DataFrame(basic_stats(temp_min, "year", "jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sept", "oct", "nov", "dec")).fillna(0)