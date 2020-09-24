/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// core components
import Admin from "layouts/Admin.js";
import RTL from "layouts/RTL.js";

import "assets/css/material-dashboard-react.css?v=1.9.0";

import Login from "./views/User/Login";
import Signup from "./views/User/SignUp";

const token = localStorage.getItem('token');

const hist = createBrowserHistory();

ReactDOM.render(
  
    <Router history={hist}>
      <Switch>
      { token == null ? 
        <>
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Redirect from="/" to="/login" /> 
        </>
        :
        <>
        <Route path="/admin" component={Admin}   />
        <Redirect from="/" to="/admin/dashboard" />
        </>
        } 
      </Switch>
      <ToastContainer />
    </Router>,
  document.getElementById("root")
);
