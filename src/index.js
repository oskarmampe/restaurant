/* eslint react/jsx-filename-extension: [1, {"extensions": [".js"]}] */
import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Layout from './Components/Layout';
import Home from './Components/Home';
import Details from './Components/Details';
import PlaceDetails from './Components/PlaceDetails';
// Import here all the required components used by the router such as SignIn, Register, ...

ReactDOM.render(
  <Layout>
    <Router>
      <div>
        <Route exact path="/" component={Home} />
        <Route path="/place_details/" component={PlaceDetails} />
        <Route path="/details/" component={Details} />
      </div>
    </Router>
  </Layout>,
  document.getElementById('root'),
);
