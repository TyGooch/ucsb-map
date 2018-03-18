import L from 'leaflet'

let config = {}

config.mapOptions = {
  center: [34.4127, -119.8492],
  zoomControl: false,
  wheelPxPerZoomLevel: 50,
  // wheelDebounceTime: 10,
  zoomAnimationThreshold: 10,
  // zoomSnap: 0,
  // zoomDelta: 0.5,
  zoom: 16,
  maxZoom: 20,
  minZoom: 14,
  // zoomSnap: 0,
  zoomDelta: 1,
  renderer: L.svg(),
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
    maxZoom: 22,
    attribution: '© <a href="https://www.mapbox.com/map-feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    id: '',
    accessToken: '',
    bounds: [[34.37575, -119.9235],[34.46765, -119.80677]],
    renderer: L.svg(),
  }
}

config.satelliteLayer = {
  uri: 'https://api.mapbox.com/styles/v1/tygooch/cjen8qxf6ciao2smk8ar69b68/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoidHlnb29jaCIsImEiOiJjamRkbDc2NmIwM2I1Mndxbzk0OTlxbHh5In0.pYzzyz9vm74G3pjt1FcX6w',
  options: {
    minZoom: 11,
    maxZoom: 22,
    attribution: '© <a href="https://www.mapbox.com/map-feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    id: '',
    accessToken: '',
    bounds: [[34.37575, -119.9235],[34.46765, -119.80677]],
    renderer: L.svg(),
  }
}

config.floor1 = "https://api.mapbox.com/styles/v1/tygooch/cjewf2g5r2av62rmrjlxzbywk/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoidHlnb29jaCIsImEiOiJjamRkbDc2NmIwM2I1Mndxbzk0OTlxbHh5In0.pYzzyz9vm74G3pjt1FcX6w"
config.floor2 = "https://api.mapbox.com/styles/v1/tygooch/cjewg6g2k2c6c2sp21jnkb07x/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoidHlnb29jaCIsImEiOiJjamRkbDc2NmIwM2I1Mndxbzk0OTlxbHh5In0.pYzzyz9vm74G3pjt1FcX6w"
config.floor3 = "https://api.mapbox.com/styles/v1/tygooch/cjewg727k2bxv2rmrlxpyk0hj/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoidHlnb29jaCIsImEiOiJjamRkbDc2NmIwM2I1Mndxbzk0OTlxbHh5In0.pYzzyz9vm74G3pjt1FcX6w"
config.floor4 = "https://api.mapbox.com/styles/v1/tygooch/cjewg8h8u2c652sqtujxwgcal/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoidHlnb29jaCIsImEiOiJjamRkbDc2NmIwM2I1Mndxbzk0OTlxbHh5In0.pYzzyz9vm74G3pjt1FcX6w"
config.floor5 = "https://api.mapbox.com/styles/v1/tygooch/cjewg98qg1to32rml29dwa85q/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoidHlnb29jaCIsImEiOiJjamRkbDc2NmIwM2I1Mndxbzk0OTlxbHh5In0.pYzzyz9vm74G3pjt1FcX6w"
config.floor6 = "https://api.mapbox.com/styles/v1/tygooch/cjewga3pn1wmc2tpfxaow7k9m/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoidHlnb29jaCIsImEiOiJjamRkbDc2NmIwM2I1Mndxbzk0OTlxbHh5In0.pYzzyz9vm74G3pjt1FcX6w"
config.floor7 = "https://api.mapbox.com/styles/v1/tygooch/cjewgatew2c8e2sqtmh4zq99z/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoidHlnb29jaCIsImEiOiJjamRkbDc2NmIwM2I1Mndxbzk0OTlxbHh5In0.pYzzyz9vm74G3pjt1FcX6w"
config.floor8 = "https://api.mapbox.com/styles/v1/tygooch/cjewgbdyc1wnl2tpfij5obvr4/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoidHlnb29jaCIsImEiOiJjamRkbDc2NmIwM2I1Mndxbzk0OTlxbHh5In0.pYzzyz9vm74G3pjt1FcX6w"

export default config
