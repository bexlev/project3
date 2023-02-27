



d3.json("project3/testfile.geojson")
  .then(function(data) {
    // code to handle the loaded data
    console.log(data);
  })
  .catch(function(error) {
    console.log(error);
  });

////////////////////////////

var myMap = L.map("map", {
  center: [ 41.878, -87.629],
  zoom: 13
});


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

function createMap(property_name) {

  // Create the tile layer that will be the background of the map.
  var streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });


  // Create a baseMaps object to hold the streetmap layer.
  var baseMaps = {
    "Street Map": streetmap
  };

  // Create an overlayMaps object to hold the property_name layer.
  var overlayMaps = {
    "Property Name": property_name
  };

  // Create the map object with options.
  var map = L.map("map-id", {
    center: [41.878, -87.629],
    zoom: 12,
    layers: [streetmap, property_name]
  });

  // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(map);
}

//////////////////////
////Bar chart
// Load the JSON data
d3.json("project3/testfile.geojson", function(data){
  console.log(data);
})

d3.json("project3/project3/testfile.geojson").then(function(data) {
 
  // Define the dropdown options based on the available years in the data
  var yearOptions = d3.set(data.map(function(d) { return d.data_year; })).values();
  yearDropdown.selectAll('option')
    .data(yearOptions)
    .enter()
    .append('option')
    .text(function(d) { return d; });

  // Define the initial data to display
  var activeY = 'electricity_use';
  var groupedData = d3.nest()
    .key(function(d) { return d.primary_property_type; })
    .entries(data);

  var initialData = groupedData.map(function(group) {
    var yValues = group.values.map(function(d) {
      return d[activeY];
    });
    var averageY = d3.mean(yValues);
    return {
      x: group.key,
      y: averageY
    };
  });

  // Define the plot layout and data
  var plotLayout = {
    title: 'Average Energy Use by Property Type',
    xaxis: {
      title: 'Property Type'
    },
    yaxis: {
      title: 'Energy Use (kBTU/sf)'
    }
  };
  var plotData = [{
    x: initialData.map(function(d) { return d.x; }),
    y: initialData.map(function(d) { return d.y; }),
    type: 'bar'
  }];

  // Create the plot
  Plotly.newPlot('plot', plotData, plotLayout);

  // Update the plot based on the selected year
  yearDropdown.on('change', function() {
    // Get the selected year from the dropdown
    var selectedYear = this.value;

    // Extract the x and y data for the selected year
    var selectedYearData = groupedData.map(function(group) {
      var yearData = group.values.filter(function(d) {
        return d.data_year == selectedYear;
      });

      // Calculate the average of the selected y-values for the current x-value
      var yValues = yearData.map(function(d) {
        return d[activeY];
      });
      var averageY = d3.mean(yValues);

      return {
        x: group.key,
        y: averageY
      };
    });

    // Update the plot with the new data
    var update = {
      x: [selectedYearData.map(function(d) { return d.x; })],
      y: [selectedYearData.map(function(d) { return d.y; })]
    };
    Plotly.update('plot', update);
  });

});
