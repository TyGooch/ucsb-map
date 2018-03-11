import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { Route, Link } from 'react-router-dom'
import { HttpsRedirect } from 'react-https-redirect'

import store, { history } from './store'
import Root from './components/Root'
import AppContainer from './components/App/AppContainer'

const target = document.getElementById('root')


document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Root />
      </ConnectedRouter>
    </Provider>,
    target
  )
})
