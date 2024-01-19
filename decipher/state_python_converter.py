#!/usr/bin/env python3
import csv
import argparse

def main(data_file_path, decipher_file_path, output_file_path):
    # Read the state_code CSV file and create a dictionary to map climdivcode to divcode and state_name
    decipher_dict = {}
    with open(decipher_file_path, 'r') as f:
        reader = csv.reader(f)
        next(reader) #skip header
        for row in reader:
            if len(row) != 3:
                print(f"Skipping invalid row: {row}")
                continue
            climdivcode, divcode, state_name = row
            decipher_dict[climdivcode] = (divcode, state_name)

    # Open the data CSV file and the output CSV file
    with open(data_file_path, 'r') as data_file, open(output_file_path, 'w', newline='') as output_file:
        data_reader = csv.reader(data_file)
        output_writer = csv.writer(output_file)
        # Write header to the output CSV file
        output_writer.writerow(['ClimDivCode', 'ActualDivCode', 'FIPS', 'State_Name', 'County Name'])

        # Go through each row in the data CSV file
        for row in data_reader:
            first_column = row[0]

            # Extract the first two numbers from the first column
            first_two_numbers = first_column[:2]

            # Find the corresponding divcode and state_name using the decipher dictionary
            divcode, state_name = decipher_dict.get(first_two_numbers, ('Unknown', 'Unknown'))

            # Write the new row to the output CSV file
            output_writer.writerow([divcode, state_name])

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Translate climdivcode to divcode and state_name in a new CSV file.')
    parser.add_argument('--data', required=True, help='Path to the  CSV file')
    parser.add_argument('--decipher', required=True, help='Path to the decipher CSV file')
    parser.add_argument('--output', required=True, help='Path to the output CSV file')

    args = parser.parse_args()

    main(args.data, args.decipher, args.output)


