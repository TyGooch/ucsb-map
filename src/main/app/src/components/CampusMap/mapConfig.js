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
  // uri: 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_nolabels/{z}/{x}/{y}.png',
  // uri: 'https://api.mapbox.com/styles/v1/tygooch/cjddl86wz42ea2rpcvh252vzq/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoidHlnb29jaCIsImEiOiJjamRkbDc2NmIwM2I1Mndxbzk0OTlxbHh5In0.pYzzyz9vm74G3pjt1FcX6w',
  uri: 'https://api.mapbox.com/styles/v1/tygooch/cjedvdb0t8av42rpjmtmwnc5m/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoidHlnb29jaCIsImEiOiJjamRkbDc2NmIwM2I1Mndxbzk0OTlxbHh5In0.pYzzyz9vm74G3pjt1FcX6w',
  options: {
    minZoom: 11,
    maxZoom: 20,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
    id: '',
    accessToken: ''
  }
}

export default config
