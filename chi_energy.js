// Basic bar chart
// Chicago energy score and national score by location
// x = primary_property_type
// y = consumption: electricity, ghi, natural gas

// Load the JSON data
var json_path = '/Resources/Chicago_Energy_Benchmarking.json'
d3.json(json_path)

d3.json(json_path).then(function(data) {
console.log(data);

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
  
