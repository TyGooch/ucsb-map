import React from 'react';
import { Route, Link } from 'react-router-dom';
import AppContainer from './App/AppContainer';
import InfoPaneContainer from './InfoPane/InfoPaneContainer';

const Routes = () => (
  <div>
    <Route path="/" component={AppContainer} />
    <Route path="/location/:name" component={InfoPaneContainer} />
  </div>
)

export default Routes