// Map Creation
var map = L.map('map').setView([51.505, -0.09], 13);

// OSM layer
var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
})
osm.addTo(map);

// adding MARKERS
var SingleMarker = L.marker([51.505, -0.09]);
SingleMarker.addTo(map);
var popup = SingleMarker.bindPopup('This is your location');
popup.addTo(map);

//tile Layer
var Thunderforest_Transport = L.tileLayer('https://{s}.tile.thunderforest.com/transport/{z}/{x}/{y}{r}.png?apikey={apikey}', {
	attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	apikey: '<your apikey>',
	maxZoom: 22
});
Thunderforest_Transport.addTo(map);

//Google Map AddOn
googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
        maxZoom: 20,
        subdomains:['mt0','mt1','mt2','mt3']
});
googleStreets.addTo(map);

//Satelite Layer
googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
        maxZoom: 20,
        subdomains:['mt0','mt1','mt2','mt3']
});
googleSat.addTo(map);

//Hybrib Layer
googleHybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',{
        maxZoom: 20,
        subdomains:['mt0','mt1','mt2','mt3']
});
googleHybrid.addTo(map);

//Terrain Layer
googleTerrain = L.tileLayer('http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',{
        maxZoom: 20,
        subdomains:['mt0','mt1','mt2','mt3']
});
googleTerrain.addTo(map);

//Layer control 
var baseLayers = {
    "OpenStreetMap": osm,
    "Satelite": googleSat,
    "GoogleMap": googleStreets,
    "ThunderForrest": Thunderforest_Transport,
};

var overlays = {
    "Marker": SingleMarker,
};

L.control.layers(baseLayers, overlays).addTo(map);

//MAP SEARCH
new L.Control.Geocoder().addTo(map);

