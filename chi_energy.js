



d3.json('project3/Resources/Chicago_Energy_Benchmarking.json', function(data){
  console.log(data);
})



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

