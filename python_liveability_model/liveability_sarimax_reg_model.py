#!usr/bin/env python
"""
This script will apply the data model sarimax to the data as needed when requested
"""
# import reqs
import numpy as np
import pandas as pd
import seaborn as sns
import plotly.graph_objs as go
import matplotlib.pyplot as plt
import datetime, statsmodels, warnings
import statsmodels.api as sm
from statsmodels.tsa.arima_model import ARIMA
from statsmodels.tsa.statespace.sarimax import SARIMAX
from statsmodels.tsa.seasonal import seasonal_decompose 
warnings.simplefilter("ignore")
from math import sqrt
from datetime import date, timedelta
from matplotlib.ticker import StrMethodFormatter

def prep_time_series(df, value_name = 'value'):
    """Use this function to transform to a time series with a single column"""
    df_long = df.melt(id_vars=['year'], var_name='month', value_name=value_name) # melt to distribute the values to long format
    month_to_num = {'jan': 1, 'feb': 2, 'mar': 3, 'apr': 4, 'may': 5, 'jun': 6,
                    'jul': 7, 'aug': 8, 'sept': 9, 'oct': 10, 'nov': 11, 'dec': 12}
    df_long['month'] = df_long['month'].map(month_to_num) # map each to numbers
    df_long['date'] = pd.to_datetime(df_long[['year', 'month']].assign(DAY=1))
    df_long = df_long.sort_values('date')
    df_long.set_index('date', inplace=True)
    df_long.drop(['year', 'month'], axis=1, inplace=True)
    return df_long