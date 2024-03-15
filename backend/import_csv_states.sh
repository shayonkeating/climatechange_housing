#!/bin/bash
FILES=/Users/shayonkeating/Documents/rltychk/backend/completed/*_counties.csv
PSQL="psql -d rltychk_db -U postgres"

for f in $FILES
do
  STATE=$(basename $f _counties.csv)
  
  if [ "$STATE" == "Alaska" ] || [ "$STATE" == "Hawaii" ]; then
    continue
  fi
  
  $PSQL -c "\copy climate_score FROM '$f' WITH (FORMAT csv, HEADER);"
done
