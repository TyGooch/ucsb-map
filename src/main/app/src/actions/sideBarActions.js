export const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR'
export const TOGGLE_SATELLITE = 'TOGGLE_SATELLITE'

export const toggle = () => ({
  type: TOGGLE_SIDEBAR
});

export const toggleBasemap = () => ({
  type: TOGGLE_SATELLITE
});

export const toggleSideBar = () => (dispatch, getState) => {
  dispatch(toggle());
};

export const toggleSatellite = () => (dispatch, getState) => {
  dispatch(toggleBasemap());
};