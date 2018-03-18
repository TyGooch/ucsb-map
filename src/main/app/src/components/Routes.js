import React from 'react';
import { Route } from 'react-router-dom';
import AppContainer from './App/AppContainer';
import InfoPaneContainer from './InfoPane/InfoPaneContainer';

const Routes = () => (
  <div>
    <Route path="/" component={AppContainer} />
    <Route path="/:name" component={InfoPaneContainer} />
    <Route path="/:name/:room" component={InfoPaneContainer} />
  </div>
)

export default Routes
