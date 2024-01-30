#!/usr/bin/env python3
import csv
import re
import sys

if len(sys.argv) != 3:
    print("Usage: ./convert.py <input_file> <output_file>")
    sys.exit(1)

input_file = sys.argv[1]
output_file = sys.argv[2]

with open(input_file, 'r', newline='', encoding='utf-8') as infile, \
     open(output_file, 'w', newline='', encoding='utf-8') as outfile:
    csv_writer = csv.writer(outfile, delimiter=',')
    for line in infile:
        row = re.split(' {8}', line.strip())
        csv_writer.writerow(row)