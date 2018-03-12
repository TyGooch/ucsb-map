let config = {}

config.mapOptions = {
  center: [34.4127, -119.8492],
  zoomControl: false,
  zoom: 16,
  maxZoom: 19,
  minZoom: 14,
  // zoomSnap: 0,
  zoomDelta: 1,
  // scrollwheel: false,
  legends: false,
  infoControl: false,
  attributionControl: true,
  bounceAtZoomLimits: false,
  maxBounds: [[34.37575, -119.9235],[34.46765, -119.80677]]
}

config.tileLayer = {
  // uri: 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_nolabels/{z}/{x}/{y}.png',
  // uri: 'https://api.mapbox.com/styles/v1/tygooch/cjddl86wz42ea2rpcvh252vzq/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoidHlnb29jaCIsImEiOiJjamRkbDc2NmIwM2I1Mndxbzk0OTlxbHh5In0.pYzzyz9vm74G3pjt1FcX6w',
  uri: 'https://api.mapbox.com/styles/v1/tygooch/cjedvdb0t8av42rpjmtmwnc5m/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoidHlnb29jaCIsImEiOiJjamRkbDc2NmIwM2I1Mndxbzk0OTlxbHh5In0.pYzzyz9vm74G3pjt1FcX6w',
  options: {
    minZoom: 11,
    maxZoom: 20,
    attribution: '© <a href="https://www.mapbox.com/map-feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    id: '',
    accessToken: '',
    bounds: [[34.37575, -119.9235],[34.46765, -119.80677]]
  }
}

config.satelliteLayer = {
  uri: 'https://api.mapbox.com/styles/v1/tygooch/cjen8qxf6ciao2smk8ar69b68/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoidHlnb29jaCIsImEiOiJjamRkbDc2NmIwM2I1Mndxbzk0OTlxbHh5In0.pYzzyz9vm74G3pjt1FcX6w',
  options: {
    minZoom: 11,
    maxZoom: 20,
    attribution: '© <a href="https://www.mapbox.com/map-feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    id: '',
    accessToken: '',
    bounds: [[34.37575, -119.9235],[34.46765, -119.80677]]
  }
}

export default config
