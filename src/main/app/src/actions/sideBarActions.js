export const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR'

export const toggle = () => ({
  type: TOGGLE_SIDEBAR
});

export const toggleSideBar = () => (dispatch, getState) => {
  dispatch(toggle());
};
