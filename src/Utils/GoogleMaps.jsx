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
    this.state = {
      location: null,
      found: false,
      markers: null,
      newMarkers: false,
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
    const { google } = this.props;
    if (this.props && google) {
      const { maps } = google;
      const { lat, lng } = this.props;
      const { newMarkers, markers } = this.state;

      this.google = google;
      this.maps = maps;
      //  lat={53.699833} lng={-1.781993}

      const zoom = 10;
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

      if (newMarkers) {
        for (let i = 0; i < markers.length; i += 1) {
          const marker = new this.maps.Marker({ // eslint-disable-line no-unused-vars
            position: new maps.LatLng(markers[i][0], markers[i][1]),
            map: this.map,
            title: 'Hello World!',
          });
        }
      }
      this.service = new this.maps.places.PlacesService(this.map);
    }
  }

  addMarkers(markers) {
    this.setState({
      markers,
      newMarkers: true,
    });
  }

  loadLocation() {
    const { location } = this.state;
    if (location) {
      const request = {
        location,
        radius: '500',
        query: 'restaurant',
      };
      this.service.textSearch(request, this.googleCallback);
    }
  }

  googleCallback(results, status) {
    const { handleIt } = this.props;
    if (status === this.maps.places.PlacesServiceStatus.OK) {
      const marker = [];
      for (let i = 0; i < results.length; i += 1) {
        const place = results[i];
        marker[i] = [place.geometry.location.lat(), place.geometry.location.lng()];
      }
      this.addMarkers(marker);
      handleIt(results);
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
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
  handleIt: PropTypes.func.isRequired,
};

export const GoogleMapsContainer = ({ lat, lng, handleIt }) => (
  <Map
    google={window.google}
    lat={lat}
    lng={lng}
    handleIt={handleIt}
  />
);

GoogleMapsContainer.propTypes = {
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
  handleIt: PropTypes.func.isRequired,
};

export default GoogleApiWrapper({
  apiKey: '',
})(GoogleMapsContainer);
