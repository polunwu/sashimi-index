mapboxgl.accessToken = 'pk.eyJ1IjoicG9sdW53dSIsImEiOiJqTFh0T0p3In0.O8qE3yk5uuqiIFSfZeELrQ';
var map = new mapboxgl.Map({
  container: 'map',
  zoom: 12,
  center: [121.543795, 25.054388],
  style: 'mapbox://styles/mapbox/light-v10'
});
var popup = new mapboxgl.Popup({ closeOnClick: false, closeButton: false })
  .setLngLat([121.543795, 25.054388])
  .setHTML('<h3>Raw N Fresh Studio</h3><p>104台北市中山區復興北路178號10樓</p>')
  .addTo(map);
var marker = new mapboxgl.Marker({ color: '#ff6000' })
  .setLngLat([121.543795, 25.054388])
  .addTo(map);