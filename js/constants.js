const mapboxAccessCode = "pk.eyJ1IjoiZGFuaWVsbGV0ZXJyYXMiLCJhIjoiY2pqeWJheGxhMGwxODNxbW1sb2UzMGo0aiJ9.Y5HiKm7qjB1vrX7NGTOofA";

const routeColor = '#00a4b3';
const routeWidthMain = 6;
const routeWidthAlternative = 3;
const routeOpacityMain = 1;
const routeOpacityAltnerative = 0.4;

const urls = {
    mapStyle: 'https://openmaptiles.github.io/positron-gl-style/style-cdn.json',
    network: 'https://cyclenetworks.osm.be/brumob/data/network.geojson',
    route: 'https://cycling-backend.anyways.eu/api',
    geocoder: `https://api.mapbox.com/geocoding/v5/mapbox.places/{0}.json?`+
                `access_token=${mapboxAccessCode}&proximity=5.5196%2c50.9612`+
                'country=BE&'+
                'bbox=5.3%2C50.70%2C5.7%2C51.1&'+
                'limit=5&'+
                'types=place,locality,neighborhood,address,poi',
    reverseGeocoder: `https://api.mapbox.com/geocoding/v5/mapbox.places/{0},{1}.json?limit=1&access_token=${mapboxAccessCode}`
};

String.prototype.format = function () {
    let a = this;
    for (let k in arguments) {
        a = a.replace(new RegExp("\\{" + k + "\\}", 'g'), arguments[k]);
    }
    return a
};
