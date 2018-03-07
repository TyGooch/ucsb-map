import React from 'react'
import { Provider } from 'react-redux'
import HttpsRedirect from 'react-https-redirect'

import AppContainer from './App/AppContainer'

const Root = ({ store }) => (
  <Provider store={store}>
    <HttpsRedirect>
      <AppContainer />
    </HttpsRedirect>
  </Provider>
)

export default Root