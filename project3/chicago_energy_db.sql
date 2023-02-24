drop table chicago_energy_table;

CREATE TABLE chicago_energy_table (
	row_id VARCHAR PRIMARY KEY,
	data_year INT, 
	building_id INT,
	property_name VARCHAR,
	reporting_status VARCHAR, 
	address VARCHAR,
	zip_code VARCHAR,
	chicago_energy_rating FLOAT,
	exempt_from_chicago_energy_rating VARCHAR,
	community_area VARCHAR,
	primary_property_type VARCHAR, 
	gross_floor_area FLOAT,
	year_built FLOAT,
	number_of_buildings FLOAT,
	energy_star_score FLOAT,
	electricity_use FLOAT,
	natural_gas_use FLOAT, 
	site_eui FLOAT,
	source_eui FLOAT,
	weather_normalized_site_eui FLOAT,
	weather_normalized_source_eui FLOAT, 
	total_ghg_emissions FLOAT, 
	ghg_intensity FLOAT,
	lat FLOAT, 
	lon FLOAT,
	loc VARCHAR
)	
;

SELECT *
FROM chicago_energy_table
;

