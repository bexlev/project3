let markerLayer, data;
const url = 'testfile.geojson'

let map = L.map("map", {
  center: [41.8781, -87.6298],
  zoom: 10,
});

L.tileLayer(
  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors",
}).addTo(map);

// Load the data and add markers to the map for the current year.
d3.json(url).then(function (res) {
  data = res.properties
  chart1(data)
  chart2(data)
  chart3(data)
  chart4(data)
  updateMarkers(2019);
});


function updateMarkers(year) {
  // Clear existing markers.
  // this line handles the initial load situation where markerLayer is undefined
  // and any situation thereafter when it is defined and needs to be cleared
  markerLayer && markerLayer.clearLayers();

  // Filter data by year.
  const dataForYear = data.filter(d => d.data_year == year);

  // Create markers for each building and add them to the map.
  const markers = [];
  dataForYear.map((d) => {
    // Extract the latitude and longitude from the data.
    // latLong exists as a string, that must be parsed
    let latLng = d.loc.replace(/[()\s]/g, '').split(',').map(x => parseFloat(x))

    // Create a marker with a popup containing the building's name and data
    const marker = L.marker(latLng)
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

// Load the data and populate the dropdown menu with available data years
d3.json(url).then(function (res) {
  data = res.properties;

  // Get an array of unique data years
  const dataYears = [...new Set(data.map(d => d.data_year))];

  // Populate the dropdown menu with available data years
  const select = d3.select("#selDataset");
  select.selectAll("option")
    .data(dataYears)
    .enter()
    .append("option")
    .text(d => d)
    .attr("value", d => d)
    .property("selected", d => d === 2019);

  chart1(data);
  chart2(data);
  chart3(data);
  chart4(data);
  updateMarkers(2019);
});

// Add an event listener to the dropdown menu to update the markers when a new year is selected
d3.select("#selDataset").on("change", function() {
  const year = parseInt(d3.event.target.value);
  updateMarkers(year);
});
/////////////////////









/////////////////

function chart1(data) {
  const energyRatingByYear = d3.rollup(
    data,
    v => d3.mean(v, d => d.chicago_energy_rating),
    d => d.data_year
  );

  const x = [...energyRatingByYear.keys()].sort((a, b) => a - b);
  const y = [...x.map(year => energyRatingByYear.get(year))];

  const layout = {
    title: "Energy Rating by Year",
    xaxis: {
      title: "Year",
      tickmode: "linear",
      tick0: x,
      dtick: 1
    },
    yaxis: {
      title: "Energy Rating"
    }
  };

  const trace = {
    x,
    y,
    type: "scatter"
  };

  Plotly.newPlot("chart1", [trace], layout);
}

function chart2(data) {
  const buildingsByCommunityArea = d3.rollup(
    data,
    v => v.length,
    d => d.community_area
  );

  const sortedBuildingsByCommunityArea = new Map([...buildingsByCommunityArea.entries()].sort((a, b) => b[1] - a[1]));

  const x = [...sortedBuildingsByCommunityArea.keys()];
  const y = [...sortedBuildingsByCommunityArea.values()];

  const layout = {
    title: "Building Count by Community Area",
    xaxis: {
      title: "Community Area",
      tickmode: "linear",
      tick0: x,
      dtick: 1
    },
    yaxis: {
      title: "Building Count"
    }
  };

  const trace = {
    x,
    y,
    type: "bar"
  };

  Plotly.newPlot("chart2", [trace], layout);
};

function chart3(data) {
  const energyUseByYear = d3.rollup(
    data,
    // account for falsy values
    v => d3.sum(v, d => d.electricity_use + d.natural_gas_use),
    d => d.data_year,
  );

  const x = [...energyUseByYear.keys()].sort((a, b) => a - b)
  const y = [...x.map(year => energyUseByYear.get(year))]

  const layout = {
    title: "Total Building Energy Use by Year",
    xaxis: {
      title: "Year",
      tickmode: "linear",
      tick0: x,
      dtick: 1
    },
    yaxis: {
      title: "Energy Use (kBtu)"
    }
  };

  const trace = {
    x,
    y,
    type: "scatter"
  };

  Plotly.newPlot("chart3", [trace], layout);
};

function chart4(data) {
  // Group the data by year and calculate the total electricity and natural gas use for each year
  const electricityUseByYear = d3.rollup(
    data,
    v => d3.sum(v, d => d.electricity_use),
    d => d.data_year,
  );

  const gasUseByYear = d3.rollup(
    data,
    v => d3.sum(v, d => d.natural_gas_use),
    d => d.data_year,
  );

  // Convert the data into arrays for Plotly.js
  const x = [...electricityUseByYear.keys()].sort((a, b) => a - b);
  const electricityUseByYearSorted = [...x.map(year => electricityUseByYear.get(year))]
  const gasUseByYearSorted = [...x.map(year => gasUseByYear.get(year))]

  // Define the traces for the plot
  const trace1 = {
    x,
    y: electricityUseByYearSorted,
    name: "Electricity Use (kBtu)",
    type: "scatter"
  };
  const trace2 = {
    x,
    y: gasUseByYearSorted,
    name: "Natural Gas Use (kBtu)",
    type: "scatter"
  };

  // Define the layout for the plot
  const layout = {
    title: "Building Energy Use by Year",
    xaxis: {
      title: "Year",
      tickmode: "linear",
      tick0: x,
      dtick: 1
    },
    yaxis: {
      title: "Energy Use (kBtu)"
    }
  };

  // Plot the chart
  Plotly.newPlot("chart4", [trace1, trace2], layout);
}
// Create a function to display chart4 in the popup
function displayChart4(data) {
  // Group the data by year and calculate the total electricity and natural gas use for each year
  const electricityUseByYear = d3.rollup(
    data,
    v => d3.sum(v, d => d.electricity_use),
    d => d.data_year,
  );

  const gasUseByYear = d3.rollup(
    data,
    v => d3.sum(v, d => d.natural_gas_use),
    d => d.data_year,
  );

  // Convert the data into arrays for Plotly.js
  const x = [...electricityUseByYear.keys()].sort((a, b) => a - b);
  const electricityUseByYearSorted = [...x.map(year => electricityUseByYear.get(year))]
  const gasUseByYearSorted = [...x.map(year => gasUseByYear.get(year))]

  // Define the traces for the plot
  const trace1 = {
    x,
    y: electricityUseByYearSorted,
    name: "Electricity Use (kBtu)",
    type: "scatter"
  };
  const trace2 = {
    x,
    y: gasUseByYearSorted,
    name: "Natural Gas Use (kBtu)",
    type: "scatter"
  };

  // Define the layout for the plot
  const layout = {
    title: "Building Energy Use by Year",
    xaxis: {
      title: "Year",
      tickmode: "linear",
      tick0: x,
      dtick: 1
    },
    yaxis: {
      title: "Energy Use (kBtu)"
    }
  };

  // Use Plotly.js to create the chart
  Plotly.newPlot("chart4-popup", [trace1, trace2], layout);
}

// Create a Leaflet marker with a popup that displays chart4 when clicked
const marker = L.geoJSON(data, {
  pointToLayer: function(feature, latlng) {
    return L.marker(latlng);
  },
  onEachFeature: function(feature, layer) {
    const [longitude, latitude] = feature.geometry.coordinates;
    layer.bindPopup('<div id="chart4-popup"></div>');
    layer.on('click', function () {
      displayChart4(data);
    });
  }
}).addTo(map);



