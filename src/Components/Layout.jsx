import React from 'react';
import PropTypes from 'prop-types';

import Header from './Header';

import '../css/normalize.css';
import '../css/skeleton.css';
import '../css/style.css';

const Layout = ({ children }) => (
  <div>
    <Header />
    {children}
  </div>
);

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Layout;
