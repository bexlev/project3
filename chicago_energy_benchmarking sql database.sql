CREATE TABLE chicago_energy_table (
	data_year INT, 
	property_name VARCHAR(50),
	reporting_status VARCHAR(30), 
	address VARCHAR(30),
	zip_code VARCHAR(5),
	chicago_energy_rating FLOAT(2),
	exempt_from_chicago_energy_rating VARCHAR(30),
	community_area VARCHAR(30),
	primary_property_type VARCHAR(30), 
	gross_floor_area FLOAT(2),
	year_built FLOAT(2),
	number_of_buildings FLOAT(2),
	water_use FLOAT(2),
	energy_star_score FLOAT(2),
	electricity_use FLOAT(2),
	natural_gas_use FLOAT(2), 
	district_steam_use FLOAT(2),
	district_chilled_water_use FLOAT(2),
	all_other_fuel_use FLOAT(2),
	site_eui FLOAT(2),
	source_eui FLOAT(2),
	weather_normalized_site_eui FLOAT(2),
	weather_normalized_source_eui FLOAT(2), 
	total_ghg_emissions FLOAT(2), 
	ghg_intensity FLOAT(2),
	lat FLOAT(2), 
	lon FLOAT(2),
	_location VARCHAR(50)
)
;