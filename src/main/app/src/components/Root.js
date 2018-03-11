import React from 'react';
import { Route, Link } from 'react-router-dom';
import AppContainer from './App/AppContainer';

const Root = () => (
  <div>
    <Route exact path="/" component={AppContainer} />
  </div>
)

export default Root