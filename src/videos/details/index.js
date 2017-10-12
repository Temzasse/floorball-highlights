import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { getSelectedVideo } from '../videos.ducks';

const propTypes = {
  selectedVideo: PropTypes.string,
};

class VideoDetails extends Component {
  componentDidMount() {
    const player = new window.YT.Player('ytPlayer', {
      height: '360',
      width: '640',
    });

    this.player = player;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedVideo !== this.props.selectedVideo) {
      this.loadVideo(nextProps.selectedVideo);
    }
  }

  loadVideo = videoId => {
    this.player.loadVideoById({ videoId });
  }

  render() {
    return (
      <VideoDetailsWrapper>
        <div id='ytPlayer' />
      </VideoDetailsWrapper>
    );
  }
}

const VideoDetailsWrapper = styled.div`
  padding: 32px;
`;

VideoDetails.propTypes = propTypes;

const mapStateToProps = state => ({
  selectedVideo: getSelectedVideo(state),
});

export default connect(mapStateToProps)(VideoDetails);

