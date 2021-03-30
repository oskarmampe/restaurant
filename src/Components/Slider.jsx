import React from 'react';
import Slider from 'react-slick';
import PropTypes from 'prop-types';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
};

const style = {
  maxHeight: '600px',
};

const ImageSlider = ({ images }) => (
  <Slider {...settings}>
    {images.map(result => (
      <div className="u-max-full-width" key={result[0]}>
        <img style={style} src={result[1]} alt="restaurant" />
      </div>
    ))}
  </Slider>
);

ImageSlider.propTypes = {
  images: PropTypes
    .arrayOf(PropTypes
      .arrayOf(PropTypes
        .oneOfType([PropTypes.string, PropTypes.number]))).isRequired,
};

export default ImageSlider;
