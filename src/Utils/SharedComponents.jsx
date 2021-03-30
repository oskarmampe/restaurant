import React from 'react';
import PropTypes from 'prop-types';
import GoogleApiWrapper from './GoogleMapsContainer';


export const Welcome = ({
  heading, text, firstImage, firstAlt, secondImage, secondAlt,
}) => (
  <div className="section welcome">
    <div className="container">
      <div className="row">
        <div className="one-half column">
          <h4 className="home-heading">{heading}</h4>
          <p>{text}</p>
        </div>
        <div className="one-half column image-container">
          <img className="image" src={firstImage} alt={firstAlt} />
          <img className="image" src={secondImage} alt={secondAlt} />
        </div>
      </div>
    </div>
  </div>
);

Welcome.propTypes = {
  heading: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  firstImage: PropTypes.string.isRequired,
  firstAlt: PropTypes.string.isRequired,
  secondImage: PropTypes.string.isRequired,
  secondAlt: PropTypes.string.isRequired,
};

export const SimpleText = ({ heading, text }) => (
  <div className="section text">
    <div className="container">
      <h3 className="section-heading">{heading}</h3>
      <p className="section-description">{text}</p>
    </div>
  </div>
);

SimpleText.propTypes = {
  heading: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export const HalfMap = () => (
  <div className="section map-container">
    <div className="container">
      <h3 className="section-heading">We reccomend Recommends:</h3>
      <div className="row">
        <div className="two-third columns">
          <h4>Meson La Pepa</h4>
          <p className="section-description">Meson La Pepa is one of the best in west yorkshire.</p>
          <GoogleApiWrapper lat={53.647642} lng={-1.782100} />
        </div>
      </div>
    </div>
  </div>
);
