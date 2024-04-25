var map = L.map('map').setView([0, -20], 2);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

let legend = L.control({position:'bottomright'});

legend.onAdd = () => {
  let div = L.DomUtil.create('div', 'legend');
  let ranges = ['- 10-10','10 - 30','30 - 50','50 - 70','70 - 90','90+'];
  let colors = ['green','lime','yellow','orange','darkorange','red'];

  div.innerHTML = "<h4>Depth</h4>"
  ranges.forEach((range,i) => {
    div.innerHTML += `<i style="background:${colors[i]}"></i> ${range}<br>`
  });

  return div;
};

legend.addTo(map);

const url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_week.geojson";

const init = async () => {
  let data = await d3.json(url);

  console.log (data) 

  L.geoJSON(data, {
    pointToLayer: function(feature, latlng) {
      return L.circleMarker(latlng);
  },
    style: function (feature) {
      let depth = feature.geometry.coordinates[2];
      console.log (feature.geometry.coordinates[2])
        return {
          color: "black",
          weight: 1,
          fillOpacity: 0.65,
          fillColor:
            depth<10 ? "green" :
            depth<30 ? "lime" : 
            depth<50 ? "yellow" : 
            depth<70 ? "orange" :
            depth<90 ? "darkorange" :
              "red"
        };
    }
}).bindPopup(function (layer) {
    return layer.feature.properties.description;
}).addTo(map);

};

init();
