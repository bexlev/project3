let markerLayer;
let map;

function initMap() {
  // Initialize the map.
  map = L.map("map", {
    center: [41.8781, -87.6298],
    zoom: 10,
  });

  // Add a tile layer to the map.
  L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors",
    }).addTo(map);

  // Load the data and add markers to the map for the current year.
  d3.json("https://data.cityofchicago.org/resource/cwig-ma7x.json").then(function(data) {
    updateMarkers("2019");
  });
}

function updateMarkers(year) {
  // Clear existing markers.
  markerLayer && markerLayer.clearLayers();

  // Filter data by year.
  const dataByYear = d3.group(data, d => new Date(d.reporting_year).getFullYear());
  const dataForYear = dataByYear.get(year);

  // Create markers for each building and add them to the map.
  const markers = [];
  dataForYear.forEach((d) => {
    // Extract the latitude and longitude from the data.
    const lat = parseFloat(d.latitude);
    const lng = parseFloat(d.longitude);

    // Create a marker with a popup containing the building's name and energy rating.
    const marker = L.marker([lat, lng])
      .bindPopup(`<h3>${d.property_name}</h3>
      <p>Energy Rating: ${d.chicago_energy_rating}</p>
      <p>Community Area: ${d.community_area}</p>
      <p>Primary Property Type: ${d.primary_property_type}</p>
      <p>ENERGY STAR Score: ${d.energy_star_score}</p>
      <p>Gross Floor Area - Buildings (sq ft): ${d.gross_floor_area_buildings_sq_ft}</p>
      <p>Water Use (kGal): ${d.water_use_kgal}</p>
      <p>Electricity Use (kBtu): ${d.electricity_use_kbtu}</p>
      <p>Natural Gas Use (kBtu): ${d.natural_gas_use_kbtu}</p>
      <p>Total GHG Emissions (Metric Tons CO2e): ${d.total_ghg_emissions_metric_tons_co2e}</p>`);

    // Add the marker to the markers array.
    markers.push(marker);
  });

  // Create a layer group with all the markers and add it to the map.
  markerLayer = L.layerGroup(markers);
  map.addLayer(markerLayer);
}
