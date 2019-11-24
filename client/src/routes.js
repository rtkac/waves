import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './store';

import Auth from './Auth';

import Layout from './components/HOC/Layout';
import NotFound from './components/NotFound';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Shop from './components/Shop';

import UserDashboard from './components/User/UserDashboard';
import AddProduct from './components/User/Admin/AddProduct';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faPhone,
  faClock,
  faCompass,
  faEnvelope,
  faTimesCircle,
  faShoppingCart,
  faAngleDown,
  faAngleUp,
  faBars,
  faTh
} from '@fortawesome/free-solid-svg-icons';

const Routes = () => {
  return (
    <Provider store={store}>
      <Layout>
        <Switch>
          <Route path="/user" exact component={Auth(UserDashboard, true)} />
          <Route path="/admin/products/add" exact component={Auth(AddProduct, true)} />

          <Route path="/login" exact component={Auth(Login, false)} />
          <Route path="/register" exact component={Auth(Register, null)} />
          <Route path="/guitars" exact component={Auth(Shop, null)} />
          <Route path="/" exact component={Auth(Home, null)} />
          <Route component={Auth(NotFound, null)} />
        </Switch>
      </Layout>
    </Provider>
  );
}

library.add(
  faPhone,
  faClock,
  faCompass,
  faEnvelope,
  faTimesCircle,
  faShoppingCart,
  faAngleDown,
  faAngleUp,
  faBars,
  faTh
);

export default Routes;