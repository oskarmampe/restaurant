import React from 'react';
import { GoogleApiWrapper } from 'google-maps-react';
import PropTypes from 'prop-types';

const style = {
  width: 'auto',
  height: '500px',
};

export class Map extends React.Component {
  constructor(props) {
    super(props);
    this.googleCallback = this.googleCallback.bind(this);
    this.loadLocation = this.loadLocation.bind(this);
    this.state = {
      location: null,
      found: false,
    };
  }

  componentDidMount() {
    this.loadMap();
  }

  componentDidUpdate(prevProps, prevState) {
    const { google } = this.props;
    const { markers, found } = this.state;
    if (prevProps.google !== google || prevState.markers !== markers) {
      this.loadMap();
    }
    if (prevState.found !== found) {
      this.loadLocation();
    }
  }

  loadMap() {
    const { google: { maps, google } } = this.props;
    const { lat, lng } = this.props;
    if (this.props && google) {
      this.google = google;
      this.maps = maps;

      const zoom = 15;
      const center = new maps.LatLng(lat, lng);
      this.setState({
        location: center,
        found: true,
      });
      const mapConfig = Object.assign({}, {
        center,
        zoom,
      });
      this.map = new maps.Map(this.node, mapConfig);
      const marker = new this.maps.Marker({ // eslint-disable-line no-unused-vars
        position: new maps.LatLng(lat, lng),
        map: this.map,
      });
      this.service = new this.maps.places.PlacesService(this.map);
    }
  }

  loadLocation() {
    const { location } = this.state;
    const { placeid } = this.props;
    if (location) {
      this.service.getDetails({
        placeId: placeid,
      }, this.googleCallback);
    }
  }

  googleCallback(results, status) {
    const { handleIt } = this.props;

    if (status === this.maps.places.PlacesServiceStatus.OK) {
      const images = [];
      const place = results.photos;
      for (let i = 0; i < place.length; i += 1) {
        images[i] = [i, results.photos[i].getUrl({
          maxWidth: 640,
          apiKey: 'AIzaSyD5aq30TCwBpJ5Da88qv0oTZGW0dbS3QJ4',
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
        })];
      }
      handleIt(results, images);
    }
  }

  render() {
    return (
      <div className="u-max-full-width" style={style} ref={(c) => { this.node = c; }}>
        Loading Map...
      </div>
    );
  }
}


Map.propTypes = {
  google: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  lat: PropTypes.string.isRequired,
  lng: PropTypes.string.isRequired,
  handleIt: PropTypes.func.isRequired,
  placeid: PropTypes.string.isRequired,
};

export const GoogleMapsContainer = ({
  lat, lng, handleIt, placeid,
}) => (
  <Map
    google={window.google}
    lat={lat}
    lng={lng}
    handleIt={handleIt}
    placeid={placeid}
  />
);

GoogleMapsContainer.propTypes = {
  lat: PropTypes.string.isRequired,
  lng: PropTypes.string.isRequired,
  handleIt: PropTypes.func.isRequired,
  placeid: PropTypes.string.isRequired,
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyD5aq30TCwBpJ5Da88qv0oTZGW0dbS3QJ4',
})(GoogleMapsContainer);
