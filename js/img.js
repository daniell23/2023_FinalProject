var map = L.map('map', {
    center: [41.3544, -99.3],
    zoom: 8
});
// we add some test layers here
var osmAttrib = 'Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC';
var osm = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC'
}).addTo(map); 
var cycle = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 18,
    attribution: osmAttrib
}).addTo(map); // this will be our active base layer on startup
/*
// a layer group with one marker
var cities = new L.LayerGroup([
    L.marker([41.76, -72.67]).bindPopup('Hartford')
]);
cities.addTo(map);
// an image overlay that will be added to the overlays of a layer switcher
// need accurate coordinates for the corners of the image.
// http://mapwarper.net/
var image = L.imageOverlay(
    'img/Ne_2018.png',
    [[40.3544, -100.7077], [42.0459, -98.0634]], {
    opacity: 1
}).addTo(map);
// init a simple layer switcher with overlays an mutual exclusive base layers
var baseLayers = {
    "OpenStreetMap": osm,
    "OpenCycleMap": cycle
};
var overlays = {
    "Marker": cities,
    "Map overlay": image
};
L.control.layers(baseLayers, overlays).addTo(map);
// init a map scale
L.control.scale().addTo(map);
// listen to click events to show a popup window
// the content of the popup is plain html
// this is a nice example how function chaining is possible with Leaflet
map.on('click', function(e) {
var popup = L.popup()
    .setLatLng(e.latlng)
    .setContent('<p>Hello, world!</p>')
    .openOn(map);
});*/

var videoUrls = [
    'img/nebraska.mp4'
];
var errorOverlayUrl = 'https://cdn-icons-png.flaticon.com/512/110/110686.png';
var latLngBounds = L.latLngBounds([[42.0459, -100.7077], [40.3544, -98.0634]]);

var videoOverlay = L.videoOverlay(videoUrls, latLngBounds, {
    opacity: 1,
    errorOverlayUrl: errorOverlayUrl,
    interactive: true,
    autoplay: true,
    muted: true,
    playsInline: true
}).addTo(map);

