import React from 'react';
import GoogleApiWrapper from '../Utils/GoogleMaps';
import ListItem from './ListItem';

export default class Details extends React.Component {
  constructor(props) {
    super(props);
    this.handleIt = this.handleIt.bind(this);
    this.state = {
      results: null,
    };
  }

  handleIt(results) {
    this.setState({
      results,
    });
  }

  render() {
    const { results } = this.state;
    if (results) {
      return (
        <div className="section details-list">
          <div className="container">
            <div className="row">
              <div className="one-half column">
                <ul>
                  {results.map(result => <ListItem result={result} key={result.placeId} />)}
                </ul>
              </div>
              <div className="one-half column">
                <GoogleApiWrapper handleIt={this.handleIt} lat={53.699833} lng={-1.781993} />
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div>
        <GoogleApiWrapper handleIt={this.handleIt} lat={53.699833} lng={-1.781993} />
      </div>
    );
  }
}
