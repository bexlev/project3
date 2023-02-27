function createChart() {
    d3.json("https://data.cityofchicago.org/resource/cwig-ma7x.json").then(function(data) {
      const energyRatingByYear = d3.rollup(
        data,
        v => d3.mean(v, d => d.chicago_energy_rating),
        d => d.data_year.slice(0, 4),
      );
  
      const x = Array.from(energyRatingByYear.keys());
      const y = Array.from(energyRatingByYear.values());
  
      const layout = {
        title: "Energy Rating by Year",
        xaxis: {
          title: "Year",
          tickmode: "linear",
          tick0: x[0],
          dtick: 1
        },
        yaxis: {
          title: "Energy Rating"
        }
      };
  
      const trace = {
        x: x,
        y: y,
        type: "scatter"
      };
  
      Plotly.newPlot("chart1", [trace], layout);
    });
  }
  
  
  /////////////////
  
  
  d3.json("https://data.cityofchicago.org/resource/cwig-ma7x.json").then(function(data) {
    const buildingsByCommunityArea = d3.rollup(
      data,
      v => v.length,
      d => d.community_area
    );
  
    const sortedBuildingsByCommunityArea = new Map([...buildingsByCommunityArea.entries()].sort((a, b) => b[1] - a[1]));
  
    const x = Array.from(sortedBuildingsByCommunityArea.keys());
    const y = Array.from(sortedBuildingsByCommunityArea.values());
  
    const layout = {
      title: "Building Count by Community Area",
      xaxis: {
        title: "Community Area",
        tickmode: "linear",
        tick0: x[0],
        dtick: 1
      },
      yaxis: {
        title: "Building Count"
      }
    };
  
    const trace = {
      x: x,
      y: y,
      type: "bar"
    };
  
    Plotly.newPlot("chart2", [trace], layout);
  });
  
  
  ///////////////////
  
  
  d3.json("https://data.cityofchicago.org/resource/cwig-ma7x.json").then(function(data) {
    const energyUseByYear = d3.rollup(
      data,
      v => d3.sum(v, d => d.electricity_use_kbtu + d.natural_gas_use_kbtu),
      d => d.data_year.slice(0, 4)
    );
  
    const x = Array.from(energyUseByYear.keys());
    const y = Array.from(energyUseByYear.values());
  
    const layout = {
      title: "Building Energy Use by Year",
      xaxis: {
        title: "Year",
        tickmode: "linear",
        tick0: x[0],
        dtick: 1
      },
      yaxis: {
        title: "Energy Use (kBtu)"
      }
    };
  
    const trace = {
      x: x,
      y: y,
      type: "scatter"
    };
  
    Plotly.newPlot("chart3", [trace], layout);
  });
//////////////
// graph.js

d3.json("https://data.cityofchicago.org/resource/cwig-ma7x.json").then(function(data) {
  // Group the data by year and calculate the total electricity and natural gas use for each year
  const energyUseByYear = d3.rollup(
    data,
    v => ({
      electricityUse: d3.sum(v, d => d.electricity_use_kbtu),
      naturalGasUse: d3.sum(v, d => d.natural_gas_use_kbtu)
    }),
    d => d.data_year.slice(0, 4)
  );

  // Convert the data into arrays for Plotly.js
  const x = Array.from(energyUseByYear.keys());
  const electricityUse = Array.from(energyUseByYear.values(), d => d.electricityUse);
  const naturalGasUse = Array.from(energyUseByYear.values(), d => d.naturalGasUse);

  // Define the traces for the plot
  const trace1 = {
    x: x,
    y: electricityUse,
    name: "Electricity Use (kBtu)",
    type: "scatter"
  };
  const trace2 = {
    x: x,
    y: naturalGasUse,
    name: "Natural Gas Use (kBtu)",
    type: "scatter"
  };

  // Define the layout for the plot
  const layout = {
    title: "Building Energy Use by Year",
    xaxis: {
      title: "Year",
      tickmode: "linear",
      tick0: x[0],
      dtick: 1
    },
    yaxis: {
      title: "Energy Use (kBtu)"
    }
  };

  // Plot the chart
  Plotly.newPlot("chart4", [trace1, trace2], layout);
});
