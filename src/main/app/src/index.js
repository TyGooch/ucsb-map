import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import HttpsRedirect from 'react-https-redirect'

import store, { history } from './store'
import Routes from './components/Routes'

const target = document.getElementById('root')


document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={store}>
      <HttpsRedirect>
        <ConnectedRouter history={history}>
          <Routes />
        </ConnectedRouter>
      </HttpsRedirect>
    </Provider>,
    target
  )
})
