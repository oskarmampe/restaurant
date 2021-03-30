import React from 'react';
import PropTypes from 'prop-types';

export default class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.node.submit();
  }

  render() {
    const {
      result: {
        name, formatted_address, rating, place_id, geometry: { location },
      },
    } = this.props;
    return (
      <form action="/place_details" method="get" ref={(c) => { this.node = c; }}>
        <input type="hidden" name="placeid" value={place_id} />
        <input type="hidden" name="lat" value={location.lat()} />
        <input type="hidden" name="lng" value={location.lng()} />
        <div onClick={this.handleClick} role="presentation">
          <li>
            <h3>{name}</h3>
            <p>{formatted_address}</p>
            <h4>{rating}</h4>
          </li>
        </div>
      </form>
    );
  }
}

ListItem.propTypes = {
  result: PropTypes.shape({
    place_id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    formatted_address: PropTypes.string.isRequired,
    rating: PropTypes.number,
    geometry: PropTypes.shape({
      location: PropTypes.shape({
        lat: PropTypes.string.isRequired,
        lng: PropTypes.string.isRequired,
      }),
    }),
  }).isRequired,
};
