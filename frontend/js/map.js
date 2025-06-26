// Map Creation
var map = L.map('map').setView([0, 0], 2);

// OSM layer
var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
})
osm.addTo(map);



//Live Location
var marker = L.marker([0, 0]).remove();
var accuracyCircle = L.circle([0, 0], { radius: 0 }).remove();

navigator.geolocation.watchPosition(success, error);

function success(pos) {
    const lat = pos.coords.latitude;
    const long = pos.coords.longitude;
    const accuracy = pos.coords.accuracy / 5; 

     marker
        .setLatLng([lat, long])
        .addTo(map);

     accuracyCircle
        .setLatLng([lat, long])
        .setRadius(accuracy)
        .addTo(map);

   map.fitBounds(accuracyCircle.getBounds());

    if (map.hasLayer(accuracyCircle)) {
        accuracyCircle
            .setLatLng([lat, long])
            .setRadius(accuracy)
            .bindPopup('You are here!');
    }
}
 
function error(err) {
    if (err.code === 1) {
        alert("accept geolocation access")

    } else {
        alert("cannot get current location")
    }
}


 
            
//Tile Layer
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
    "marker": marker,
    "Live Accuracy": accuracyCircle
};
L.control.layers(baseLayers, overlays).addTo(map);


// Initialize Mini Map
const miniMap = L.map('mini-map', {
    zoomControl: true,
    attributionControl: false,
    dragging: true,
    tap: false
}).setView([6.5244, 3.3792], 13); // Default to Lagos coordinates

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(miniMap);

let locationMarker;

// Handle map clicks
miniMap.on('click', function(e) {
    if (locationMarker) {
        miniMap.removeLayer(locationMarker);
    }
    
    locationMarker = L.marker(e.latlng, {
        icon: L.icon({
            iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41]
        })
    }).addTo(miniMap);
    
    // Update form with coordinates
    document.getElementById('address').value = `${e.latlng.lat.toFixed(4)}, ${e.latlng.lng.toFixed(4)}`;
});

// Sync with city selection
document.getElementById('city').addEventListener('change', function() {
    const cities = {
        'lagos': [6.5244, 3.3792],
        'port-harcourt': [4.8156, 7.0498],
        'delta': [5.5320, 5.8980]
    };
    
    miniMap.setView(cities[this.value], 13);
});
 
