mapboxgl.accessToken = mapToken;

const coordsArray = JSON.parse(coordinates);

const map = new mapboxgl.Map({
    container: 'map',
    style: "mapbox://styles/mapbox/streets-v12", // required
    center: coordsArray, // [lng, lat]
    zoom: 9
});

new mapboxgl.Marker({color : 'red'})
    .setLngLat(coordsArray)
    .addTo(map);
