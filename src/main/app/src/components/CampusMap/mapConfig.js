let config = {}

config.mapOptions = {
  center: [34.4127, -119.8492],
  zoomControl: false,
  zoom: 16,
  maxZoom: 19,
  minZoom: 11,
  scrollwheel: false,
  legends: false,
  infoControl: false,
  attributionControl: true
}

config.tileLayer = {
  uri: 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png',
  options: {
    minZoom: 11,
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
    subdomains: 'abcd',
    id: '',
    accessToken: ''
  }
}

export default config
