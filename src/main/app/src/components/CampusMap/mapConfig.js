let config = {}

config.mapOptions = {
  center: [34.4127, -119.8492],
  zoomControl: false,
  zoom: 16,
  maxZoom: 19,
  minZoom: 14,
  // scrollwheel: false,
  legends: false,
  infoControl: false,
  attributionControl: true,
  bounceAtZoomLimits: false,
}

config.tileLayer = {
  uri: 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_nolabels/{z}/{x}/{y}.png',
  options: {
    minZoom: 11,
    maxZoom: 20,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
    id: '',
    accessToken: ''
  }
}

export default config
