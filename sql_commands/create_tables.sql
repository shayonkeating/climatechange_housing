/* Use these queries to build out the tables for the database for querying climate data*/

CREATE TABLE temperature_min_state (
    col_num INTEGER,
    ClimDivCode_x INTEGER,
    fips_code_start INTEGER,
    weather_data_type INTEGER,
    year INTEGER,
    jan DECIMAL,
    feb DECIMAL,
    mar DECIMAL,
    apr DECIMAL,
    may DECIMAL,
    jun DECIMAL,
    jul DECIMAL,
    aug DECIMAL,
    sept DECIMAL,
    oct DECIMAL,
    nov DECIMAL,
    dec DECIMAL,
    NCDC_FIPS_ID INTEGER,
    ClimDivCode_y INTEGER,
    ActualDivCode INTEGER,
    StateName VARCHAR(255),
    FIPS_code INTEGER,
    name VARCHAR(255),
    State_Code INTEGER,
    CLIMDIV_ID INTEGER
);

COPY temperature_min_state FROM '/temperature_min_state.csv' DELIMITER ',' CSV HEADER;

select * from temperature_min_state limit 5;

CREATE TABLE temperature_max_state (
    col_num INTEGER,
    ClimDivCode_x INTEGER,
    fips_code_start INTEGER,
    weather_data_type INTEGER,
    year INTEGER,
    jan DECIMAL,
    feb DECIMAL,
    mar DECIMAL,
    apr DECIMAL,
    may DECIMAL,
    jun DECIMAL,
    jul DECIMAL,
    aug DECIMAL,
    sept DECIMAL,
    oct DECIMAL,
    nov DECIMAL,
    dec DECIMAL,
    NCDC_FIPS_ID INTEGER,
    ClimDivCode_y INTEGER,
    ActualDivCode INTEGER,
    StateName VARCHAR(255),
    FIPS_code INTEGER,
    name VARCHAR(255),
    State_Code INTEGER,
    CLIMDIV_ID INTEGER
);

COPY temperature_max_state FROM '/temperature_max_state.csv' DELIMITER ',' CSV HEADER;

select * from temperature_max_state limit 5;

CREATE TABLE temperature_avg_state (
    col_num INTEGER,
    ClimDivCode_x INTEGER,
    fips_code_start INTEGER,
    weather_data_type INTEGER,
    year INTEGER,
    jan DECIMAL,
    feb DECIMAL,
    mar DECIMAL,
    apr DECIMAL,
    may DECIMAL,
    jun DECIMAL,
    jul DECIMAL,
    aug DECIMAL,
    sept DECIMAL,
    oct DECIMAL,
    nov DECIMAL,
    dec DECIMAL,
    NCDC_FIPS_ID INTEGER,
    ClimDivCode_y INTEGER,
    ActualDivCode INTEGER,
    StateName VARCHAR(255),
    FIPS_code INTEGER,
    name VARCHAR(255),
    State_Code INTEGER,
    CLIMDIV_ID INTEGER
);

COPY temperature_avg_state FROM '/temperature_avg_state.csv' DELIMITER ',' CSV HEADER;

select * from temperature_avg_state limit 5;

CREATE TABLE preciptation_state (
    col_num INTEGER,
    ClimDivCode_x INTEGER,
    fips_code_start INTEGER,
    weather_data_type INTEGER,
    year INTEGER,
    jan DECIMAL,
    feb DECIMAL,
    mar DECIMAL,
    apr DECIMAL,
    may DECIMAL,
    jun DECIMAL,
    jul DECIMAL,
    aug DECIMAL,
    sept DECIMAL,
    oct DECIMAL,
    nov DECIMAL,
    dec DECIMAL,
    NCDC_FIPS_ID INTEGER,
    ClimDivCode_y INTEGER,
    ActualDivCode INTEGER,
    StateName VARCHAR(255),
    FIPS_code INTEGER,
    name VARCHAR(255),
    State_Code INTEGER,
    CLIMDIV_ID INTEGER
);

COPY preciptation_state FROM '/preciptation_state.csv' DELIMITER ',' CSV HEADER;

select * from preciptation_state limit 5;

CREATE TABLE num_heating_days_state (
    col_num INTEGER,
    ClimDivCode_x INTEGER,
    fips_code_start INTEGER,
    weather_data_type INTEGER,
    year INTEGER,
    jan DECIMAL,
    feb DECIMAL,
    mar DECIMAL,
    apr DECIMAL,
    may DECIMAL,
    jun DECIMAL,
    jul DECIMAL,
    aug DECIMAL,
    sept DECIMAL,
    oct DECIMAL,
    nov DECIMAL,
    dec DECIMAL,
    NCDC_FIPS_ID INTEGER,
    ClimDivCode_y INTEGER,
    ActualDivCode INTEGER,
    StateName VARCHAR(255),
    FIPS_code INTEGER,
    name VARCHAR(255),
    State_Code INTEGER,
    CLIMDIV_ID INTEGER
);

COPY num_heating_days_state FROM '/num_heating_days_state.csv' DELIMITER ',' CSV HEADER;

select * from num_heating_days_state limit 5;

CREATE TABLE num_cooling_days_state (
    col_num INTEGER,
    ClimDivCode_x INTEGER,
    fips_code_start INTEGER,
    weather_data_type INTEGER,
    year INTEGER,
    jan DECIMAL,
    feb DECIMAL,
    mar DECIMAL,
    apr DECIMAL,
    may DECIMAL,
    jun DECIMAL,
    jul DECIMAL,
    aug DECIMAL,
    sept DECIMAL,
    oct DECIMAL,
    nov DECIMAL,
    dec DECIMAL,
    NCDC_FIPS_ID INTEGER,
    ClimDivCode_y INTEGER,
    ActualDivCode INTEGER,
    StateName VARCHAR(255),
    FIPS_code INTEGER,
    name VARCHAR(255),
    State_Code INTEGER,
    CLIMDIV_ID INTEGER
);

COPY num_cooling_days_state FROM '/num_cooling_days_state.csv' DELIMITER ',' CSV HEADER;

select * from num_cooling_days_state limit 5;


-- delete duplicates using CTE

WITH DuplicateRank AS (
    SELECT ctid,
           ROW_NUMBER() OVER(
               PARTITION BY state, county, composite_score, heater_z_slope, cooler_z_slope,
               precip_z_slope, temp_a_z_slope, temp_max_z_slope, temp_min_z_slope
               ORDER BY state, county 
           ) AS rn
    FROM climate_score
)
DELETE FROM climate_score
WHERE ctid IN (
    SELECT ctid FROM DuplicateRank WHERE rn > 1
);
