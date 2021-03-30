import React from 'react';
import GoogleApiWrapper from '../Utils/GooglePlaces';
import ImageSlider from './Slider';

export default class PlaceDetails extends React.Component {
  static getPlaceId(param) {
    const urlString = window.location.href;
    const url = new URL(urlString);
    if (param === 'placeid') {
      return url.searchParams.get('placeid');
    }
    if (param === 'lat') {
      return url.searchParams.get('lat');
    }
    if (param === 'lng') {
      return url.searchParams.get('lng');
    }
    return '';
  }

  constructor(props) {
    super(props);
    this.state = {
      results: null,
      images: [],
    };
    this.handleIt = this.handleIt.bind(this);
  }

  handleIt(results, images) {
    this.setState({
      results,
      images,
    });
  }


  render() {
    const { results, images } = this.state;
    if (!results) {
      return (
        <div>
          <GoogleApiWrapper handleIt={this.handleIt} placeid={PlaceDetails.getPlaceId('placeid')} lat={PlaceDetails.getPlaceId('lat')} lng={PlaceDetails.getPlaceId('lng')} />
        </div>
      );
    }
    return (
      <div className="section place-details">
        <div className="container">
          <div className="row">
            <div className="one-third column">
              <GoogleApiWrapper handleIt={this.handleIt} placeid={PlaceDetails.getPlaceId('placeid')} lat={PlaceDetails.getPlaceId('lat')} lng={PlaceDetails.getPlaceId('lng')} />
            </div>
            <div className="one-third column">
              <h1>{results.name}</h1>
              <h2>
                Overall Rating:
                { results.rating }
              </h2>
              <h3>{ results.formatted_address }</h3>
              <h5>{results.formatted_phone_number}</h5>
              <p>
                <a
                  href={results.website}
                >
                  {results.website}
                </a>
              </p>
              <p>{results.opening_hours.open_now === true ? 'The restaurant is open right now' : 'The restaurant is currently closed'}</p>
              <ul className="opening-hours">
                {results.opening_hours.weekday_text.map(result => (
                  <li>
                    <p>{result}</p>
                  </li>
                ))}
              </ul>
              {results.reviews.map(result => (
                <ul className="list sources card">
                  <li>
                    <b>{result.author_name}</b>
                  </li>
                  <li>
                    {result.relative_time_description}
                  </li>
                  <li>
                    Rating:
                    {result.rating}
                  </li>
                  <li>
                    {result.text}
                  </li>
                </ul>
              ))}
            </div>
            <div className="one-third column">
              <ImageSlider results={results} images={images} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
