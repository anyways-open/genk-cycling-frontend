const mapboxAccessCode = "pk.eyJ1IjoiYmVuLWFueXdheXMiLCJhIjoiY2p6d3RyMzVhMGVoYjNibGEwNGYzc21zciJ9.T9X-lvJFZrWiFyzYQUPIew";

const routeWidthMain = 6;
const routeWidthAlternative = 3;
const routeOpacityMain = 1;
const routeOpacityAltnerative = 0.0;

const production_urls = {
    mapStyle: 'https://openmaptiles.github.io/positron-gl-style/style-cdn.json',
    network: 'https://cyclenetworks.osm.be/brumob/data/network.geojson',
    //route: 'https://cycling-backend.anyways.eu/api',
    route: 'https://routing.anyways.eu/api',
    geocoder: `https://api.mapbox.com/geocoding/v5/mapbox.places/{0}.json?`+
                `access_token=${mapboxAccessCode}&proximity=5.5196%2c50.9612`+
                'country=BE&'+
                'bbox=5.3%2C50.70%2C5.7%2C51.1&'+
                'limit=5&'+
                'types=place,locality,neighborhood,address,poi',
    reverseGeocoder: `https://api.mapbox.com/geocoding/v5/mapbox.places/{0},{1}.json?limit=1&access_token=${mapboxAccessCode}`
};

const test_urls = {
    mapStyle: 'https://openmaptiles.github.io/positron-gl-style/style-cdn.json',
    network: 'https://cyclenetworks.osm.be/brumob/data/network.geojson',
    route: 'http://localhost:5000',
    geocoder: `https://api.mapbox.com/geocoding/v5/mapbox.places/{0}.json?`+
                `access_token=${mapboxAccessCode}&proximity=5.5196%2c50.9612`+
                'country=BE&'+
                'bbox=5.3%2C50.70%2C5.7%2C51.1&'+
                'limit=5&'+
                'types=place,locality,neighborhood,address,poi',
    reverseGeocoder: `https://api.mapbox.com/geocoding/v5/mapbox.places/{0},{1}.json?limit=1&access_token=${mapboxAccessCode}`
};

/*
alert('Testing URLS enabled');
const urls = test_urls;
/*/
const urls = production_urls;
// */
String.prototype.format = function () {
    let a = this;
    for (let k in arguments) {
        a = a.replace(new RegExp("\\{" + k + "\\}", 'g'), arguments[k]);
    }
    return a
};
