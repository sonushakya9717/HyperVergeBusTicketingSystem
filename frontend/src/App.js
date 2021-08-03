import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import 'semantic-ui-css/semantic.min.css'

import {Provider} from 'react-redux';
import store from './Store';

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Footer from "./components/layout/Footer";
import Alerts from "./components/layout/Alerts";
import BookTicket from "./components/UsersDashboard/BookTicket";
import SearchBuses  from './components/UsersDashboard/SeachBuses';
import Buses from './components/UsersDashboard/Buses'
import Dashboard from './components/AdminDashboard/Dashboard'
import PrivateRoute from "./components/routing/PrivateRoutes";
import AdminRoute from "./components/routing/AdminRoutes";



import UserLogin from "./components/auth/UserLogin";
import UserSignUp from "./components/auth/UserSignUp";
import AdminLogin from "./components/auth/AdminLogin";
import AdminSignup from "./components/auth/AdminSignup";
import Profile from "./components/AdminDashboard/Profile"
import AdminBuses from "./components/AdminDashboard/Buses";
import AddBus from "./components/AdminDashboard/AddBus";
import AddLocation from "./components/AdminDashboard/AddLocation";
import AddStaff from "./components/AdminDashboard/AddStaff";
import Staffs from "./components/AdminDashboard/Staffs";



import "./App.css";
import { loadUser } from './actions/auth'
import setAuthToken from './utils/setAuthToken'
import Tickets from "./components/UsersDashboard/Tickets";

if(localStorage.token){
  setAuthToken(localStorage.token);
}


const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  },[]);

  return (

  <Provider store={store }>
  <Router>
    <Fragment>
      <Navbar />
      <Route exact path="/" component={Landing} />
      <section className='container mb-5 pb-5'>
        <Alerts />
        <Switch>
          <Route exact path='/user/register' component={UserSignUp} />
          <Route exact path='/user/login' component={UserLogin} />
          <Route exact path='/admin/login' component={AdminLogin} />
          <Route exact path='/admin/register' component={AdminSignup} />
          <PrivateRoute exact path='/searchBuses' component={SearchBuses} />
          <PrivateRoute exact path='/my-bookings' component={Tickets} />
          <PrivateRoute exact path='/getbuses' component={Buses} />
          <PrivateRoute exact path='/bus/:busId/bookTickets' component={BookTicket} />
          <AdminRoute exact path='/admin/dashboard' component={Dashboard} />
          <AdminRoute exact path='/create-profile' component={Profile} />
          <AdminRoute exact path='/my-buses' component={AdminBuses} />
          <AdminRoute exact path='/addbus' component={AddBus} />
          <AdminRoute exact path='/addLocation' component={AddLocation} />
          <AdminRoute exact path='/addStaff' component={AddStaff} />
          <AdminRoute exact path='/my-staffs' component={Staffs} />

        </Switch>
      </section>
      <Footer />
    </Fragment>
  </Router>
  </Provider>
)};

export default App;
