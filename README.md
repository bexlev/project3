# Project 3- Chicago Energy Benchmarking 
  
This is a group project purposed to demonstarte our ability to tell stories using data vizualization.</div>


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
  

## Extract

- We sourced our original data from the Chicago Data Portal. We extracted two different data sets containing food inspection instances in Chicago and surrounding areas. 
- The first data set contains food inspection instances from 1/1/2010-6/30/2018, and the second data set contains instances from 7/1/2018-Present.
- Both sets have the same keys, and the reason a new set was created after 7/1/2018 was because the definitions of violations changed.
- We extracted the first data set, Food Inspections- 1/1/2010-6/30/2018, as a CSV file. This source contained most of the data, with 173k food inspection instances.
- The second data set, Food Inspections- 7/1/2018-Present was extracted as a JSON file using an API call.
- The url= (https://data.cityofchicago.org/resource/qizy-d2wf.json) we used for the API call. 
- Using the data in the JSON file, we created a column heading list as well as an empty list to hold all data rows. Using a for loop we extracted our desired values and appended them to the list we created.
- From here, we created a data frame using the extracted rows and column header list.

## Transform

- Reviewing the food inspection data set, we chose "inspection_id" as the primary key due to the unique values across both data sets. 
- Right away we dropped 3 columns, "Latitude", "Longitude", and "Location". These keys did not contain relevant values to our desired data set as all 3 columns contained coordinates for their respected business.
- We renamed all the remaining columns in our CSV file to lower case with under-scores in place of spaces. We did this to ensure proper loading into PostgreSQL. 
- We loaded both datasets into pandas DataFrames and combined DataFrames into one single source.
- We changed "inspection_id", "license_id", and "zip" from float to integer. 
- We also changed "inspection_date" to datetime. JSON and CSV had different formats for their dates, so we had to change the format to match. 
- To clarify the "risk" column, we split the values in the column into 3 separate columns.
- The first column contained just the string value "Risk", which we deemed unnecessary and dropped the column. The second column contains the risk rank as an integer from 1-3, given in the original data set. The third column contains the level of risk from low-high, and we removed the parentheses enclosing the levels from the original column.
- Some risk values were blank; for these we added a value of "0". 
- We investigated the "results" column containing the outcome of each instance. Some rows were labeled "Out of Business". We dropped these rows as they serve no relevance due to their forced closure. 
- The original data set warns that there may have been duplicate values. To clean this, we found duplicate "inspection_id" values and dropped those.
- For purposes of this project, we dropped the "violations" column as the values of this column were too large to fit the database. In a real-world situation, this column would be imperative for analysis.

## Load

- We loaded our final data into a relational database for storage.
- We created a connection to PostgreSQL and used this to create a sqlalchemy engine.
- From here, we loaded our dataframe to SQL by doing a bulk insert into a PostgreSQL database table.
- We used SQL in PostgreSQL to create the table. 
- Finally, we commited our changes and closed the session. 

## Topic Chosen

- Given the timeframe and project requirements, we decided these data sets had the potential to meet the ETL requirements for this project.

## API Call Limitations

- The API call has a limitation of the number of records that can be extracted, therefore we only used this data as a way to illustrate for the purposes of this class how to combine two datasets together.
