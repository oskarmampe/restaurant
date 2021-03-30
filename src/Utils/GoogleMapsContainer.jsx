import React from 'react';
import {
  Marker, Map, InfoWindow, GoogleApiWrapper,
} from 'google-maps-react';
import PropTypes from 'prop-types';

export class GoogleMapsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
    };
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClicked = this.onMapClicked.bind(this);
  }

  onMarkerClick(places, marker) {
    this.setState({
      selectedPlace: places,
      activeMarker: marker,
      showingInfoWindow: true,
    });
  }

  onMapClicked() {
    const { showingInfoWindow } = this.state;
    const { handleIt } = this.props;
    if (showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
    handleIt();
  }

  render() {
    const style = {
      width: 'auto',
      height: '600px',
    };

    const {
      lat, lng, title, name,
    } = this.props;

    const {
      activeMarker, showingInfoWindow, selectedPlace,
    } = this.state;

    return (
      <Map
        google={window.google}
        item
        xs={12}
        gestureHandling="greedy"
        center={{ lat, lng }}
        style={style}
        onClick={this.onMapClick}
        zoom={14}
        initialCenter={{ lat, lng }}
        className="u-max-full-width google-map"
      >
        <Marker
          onClick={this.onMarkerClick}
          title={title}
          position={{ lat, lng }}
          name={name}
        />
        <InfoWindow
          marker={activeMarker}
          visible={showingInfoWindow}
        >
          <div>
            <h1>{selectedPlace.name}</h1>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

GoogleMapsContainer.propTypes = {
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
  handleIt: PropTypes.func.isRequired,
  title: PropTypes.string,
  name: PropTypes.string,
};

GoogleMapsContainer.defaultProps = {
  title: 'Restaurant',
  name: 'Restaurant',
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyD5aq30TCwBpJ5Da88qv0oTZGW0dbS3QJ4',
})(GoogleMapsContainer);
