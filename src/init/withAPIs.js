import React, { Component } from 'react';
import config from '../config';

const withAPIs = Comp => {
  return class ApiProvider extends Component {
    state = {
      youtubeApiLoaded: false,
      youtubePlayerLoaded: false,
    };

    componentWillMount() {
      this.startGApiLoader();
      this.startYtLoader();
    }

    startGApiLoader = () => {
      if (!window.gapi || !window.gapi.client) {
        this.googleApiLoader = setInterval(
          this.checkIfGoogleApiExists,
          500
        );
      } else {
        this.loadYoutubeApi();
      }
    };

    startYtLoader = () => {
      if (!window.YT) {
        this.youtubePlayerApiLoader = setInterval(
          this.checkIfPlayerApiExists,
          500
        );
      } else {
        this.setState({ youtubePlayerLoaded: true });
      }
    };

    checkIfGoogleApiExists = () => {
      if (window.gapi && window.gapi.client) {
        this.loadYoutubeApi();
        clearInterval(this.googleApiLoader);
      }
    };

    checkIfPlayerApiExists = () => {
      if (window.YT) {
        this.setState({ youtubePlayerLoaded: true });
        clearInterval(this.youtubePlayerApiLoader);
      }
    };

    loadYoutubeApi = () => {
      window.gapi.client.load('youtube', 'v3', () => {
        window.gapi.client.setApiKey(config.GOOGLE_API_KEY);
        this.setState({ youtubeApiLoaded: true });
      });
    };

    render() {
      const {
        youtubeApiLoaded,
        youtubePlayerLoaded,
      } = this.state;

      const ready = youtubeApiLoaded && youtubePlayerLoaded;

      if (!ready) return null;

      return <Comp {...this.props} youtubeApi={window.gapi.client.youtube} />;
    }
  };
};

export default withAPIs;
