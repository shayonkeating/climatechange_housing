#!/usr/bin/env python3
"""
Run through each and every single state in the US per county using the ML
Model built for this climate_model.py

Author: Shayon Keating
Date: February 11, 2024
"""

# import reqs
import csv
import subprocess

script_path = "climate_model/climate_model.py"

state_name = "Tennessee"

# list of all counties:
counties = [
    "Anderson", "Bedford", "Benton", "Bledsoe", "Blount", "Bradley", "Campbell", "Cannon",
    "Carroll", "Carter", "Cheatham", "Chester", "Claiborne", "Clay", "Cocke", "Coffee",
    "Crockett", "Cumberland", "Davidson", "Decatur", "DeKalb", "Dickson", "Dyer", "Fayette",
    "Fentress", "Franklin", "Gibson", "Giles", "Grainger", "Greene", "Grundy", "Hamblen",
    "Hamilton", "Hancock", "Hardeman", "Hardin", "Hawkins", "Haywood", "Henderson", "Henry",
    "Hickman", "Houston", "Humphreys", "Jackson", "Jefferson", "Johnson", "Knox", "Lake",
    "Lauderdale", "Lawrence", "Lewis", "Lincoln", "Loudon", "McMinn", "McNairy", "Macon",
    "Madison", "Marion", "Marshall", "Maury", "Meigs", "Monroe", "Montgomery", "Moore",
    "Morgan", "Obion", "Overton", "Perry", "Pickett", "Polk", "Putnam", "Rhea", "Roane",
    "Robertson", "Rutherford", "Scott", "Sequatchie", "Sevier", "Shelby", "Smith", "Stewart",
    "Sullivan", "Sumner", "Tipton", "Trousdale", "Unicoi", "Union", "Van Buren", "Warren",
    "Washington", "Wayne", "Weakley", "White", "Williamson", "Wilson"
]


output_csv_file =f"{state_name}_counties.csv"

with open(output_csv_file, "w", newline="") as csvfile:
    writer = csv.writer(csvfile)

    writer.writerow(["State", "County", "Composite Score", "heater_z Slope", "cooler_z Slope", "precip_z Slope", "temp_a_z Slope", "temp_max_z Slope", "temp_min_z Slope"])

    # Iterate over each county
    for county in counties:
        try:
            result = subprocess.run(["python3", script_path], input=f"{state_name}\n{county}\n", capture_output=True, text=True)

            output_lines = result.stdout.strip().split('\n')

            composite_score = output_lines[0].split('; ')[1]
            slopes = [line.split(': ')[1] for line in output_lines[1:]]

            writer.writerow([state_name, county, composite_score] + slopes)
            print(f"Completed {county}")
        except Exception as e:
            print(f"Error processing {county} county or does not exist, skipping...")
            continue

print("CSV file generated successfully.")
