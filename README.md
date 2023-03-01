<div><img align=left width=200px height=120px src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaTDbsqoiHdttMWC9s4MBjNNj8JHMDIdKB6A&usqp=CAU">


# Project 3- Chicago Energy Benchmarking 
  
This is a group project purposed to demonstate our ability to tell stories using data vizualization on an interactive dashboard.</div>


## Contributors
  
- Heather Robson
- Becca Levine
- Kevin Denning
- Bakari Simmons
- Camille Jensen
  
  
## DataSets

<div> Source: <a href="[https://data.cityofchicago.org/Health-Human-Services/Food-Inspections/4ijn-s7e5](https://data.cityofchicago.org/resource/xq83-jr8c.json)" target="_blank">Chicago Data Portal - Chicago Energy Benchmarking.</a> 
Dataset - The Chicago Building Energy Use Benchmarking Ordinance calls on existing municipal, commercial, and residential buildings larger than 50,000 square feet to track whole-building energy use, report to the City annually.</div>
  
  | Column Name     | Type    | Description              |
  | ----------------| ------- | ------------------------ |
  | Data Year       | Int     | Calendar Year 
  | ID              | Int  | Unique idetifier for each property            
  | Property Name   | String  | Official property name
  | Reporting Status| String     | Whether or not the building submitted its report for the Data Year shown
  | Address         | String  | Property Street Address
  | Zip Code        | String  | Property ZIP code
  | Chicago Energy Rating             | Int  | The zero-to-four-star Chicago Energy Rating assigned to the building in the shown Data Year 
  | Exempt From Chicago Energy Rating | String  | Shows whether the building is subject to the Chicago Energy Rating Ordinance
  | Community Area     | String  | The Chicago community area where the property is located
  | Primary Property Type           | String     | The primary use of a property (e.g. office, retail store)
  | Gross Floor Are - Buildings (sq ft) | Int  | Total interior floor space in square feet between the outside surfaces of a building’s enclosing walls
  | Year Built | Int | Year in which a property was constructed or underwent a complete renovation
  | # of Buildings         | Int | Number of buildings included in the property's report
  | Water Use (kGal)      | Int | Water use for the data year in thousands of gallons from 2018 and on
  | ENERGY STAR Score       | Int     | 1-100 rating that assesses a property’s overall energy performance, based on national data to control for differences among climate, building uses, and operations 
  | Electricity Use (kBtu)              | Int  | The annual amount of electricity consumed by the property on-site            
  | Natural Gas Use (kBtu)   | Int  | The annual amount of utility-supplied natural gas consumed by the property
  | District Steam Use (kBtu)| Int     | The annual amount of district steam consumed by the property on-site
  | District Chilled Water Use (kBtu)         | Int  | The annual amount of district chilled water consumed by the property on-site
  | All Other Fuel Use (kBtu)        | Int  | The annual amount of fuel use other than electricity, natural gas, district chilled water, or district steam consumed by the property on-site
  | Site EUI (kBtu/sq ft)       | Int     | Site Energy Use Intensity (EUI) is a property's Site Energy Use divided by its gross floor area. Site Energy Use is the annual amount of all the energy consumed by the property on-site, as reported on utility bills. 
  | Source EUI (kBtu/sq ft)              | Int  | Source Energy Use Intensity (EUI) is a property's Source Energy Use divided by its gross floor area. Source Energy Use is the annual energy used to operate the property, including losses from generation, transmission, & distribution           
  | Weather Normalized Site EUI (kBtu/sq ft)   | Int  | Weather Normalized (WN) Site Energy Use Intensity (EUI) is a property's WN Site Energy divided by its gross floor area (in square feet). WN Site Energy is the Site Energy Use the property would have consumed during 30-year average weather conditions
  | Weather Normalized Source EUI (kBtu/sq ft)| Int     | Weather Normalized (WN) Source Energy Use Intensity (EUI) is a property's WN Source Energy divided by its gross floor area. WN Source Energy is the Source Energy Use the property would have consumed during 30-year average weather conditions
  | Total GHG Emissions (Metric Tons CO2e)        | Int  | The total amount of greenhouse gas emissions, including carbon dioxide, methane, and nitrous oxide gases released into the atmosphere as a result of energy consumption at the property, measured in metric tons of carbon dioxide equivalent
  | GHG Intensity (kg CO2e/sq ft)        | Int  | Total Greenhouse Gas Emissions divided by property's gross floor area, measured in kilograms of carbon dioxide equivalent per square foot
  | Latitude        | Float  | Latitude 
  | Longitude       | Float  | Longitude
  | Location        | String | Latitude and Longitude in dictionary format
  | Row_ID        | String | A unique ID for the row, made up of the combination of the Data Year and ID


## Clean Up

- We queried the number of rows in the dataset to ensure we had greater than 100 unique records. The original dataset contains 17728 unique records.
- We dropped all rows that were 'Exempt' for their 'Reporting Status' as these buildings did not submit any reports to be included in the data set. 
- We renamed the 'ID' column to 'Building ID' to further differentiate from 'Row_ID' which is unique for each row. 'Building ID' is unique to each building, meaning there are duplicates in this column. 
- Identified rows containing null values, and filled in with 'NaN' in order to appropraitely upload our data to our SQL database.
- We grouped our data by building in unique 'Community Areas' in order to compare energy usage amongst Chciagos neighborhoods.
- In order to upload our data set into a SQL Database, we needed to rename all original columns to include all lower case letters and replace spaces with underscores.


## Load

- We created a SQL database, in PostgreSQL, called 'Chicago_Energy_Benchmarking.SQL' and within this we created a table to store our CSV file.
- We set 'row_id' as our primary key. 
- Using PgAdmin, we imported our Clean_data.csv into our chicago_energy_benchmarking table. 
- Finally, we commited our changes and closed the session. 

## Analyses and Visualizations
- We read in our json file using the D3 Library
- Using JavaScript and HTML, we created a dashboard fit with a dropdown element and vizualizations.
- We included a map of each building that filed and energy report in Chicago for each year between 2018-2020. The map indicated which neighborhoods use the greatest amount of energy, as well details about individual building energy ratings.
- Using the dropdown, site visitors have the ability to select the year of the data they see on the map. As buildings energy ratings are assigned annually, energy scores are subject to change. This function allows users to narrow it down to a particular year. 
- Chart 1 is a line graph depicting the average yearly Chicago Energy Rating for all buildings that submitted a report. As you can see, 2019 was a low scoring year, with an improvemnet in 2020.
- Charts 3 and 4 show the total energy use across the datset for each year (shown in kBtu). Chart 4 looks at natural gas and elecrticity use indepentdently. In 2018, natural gas usage was much higher than any other year, in fact total energy consumpotion was higher. Its interesting that 2018 had a better average energy performance rate than 2019, even with the higher consumption. 

