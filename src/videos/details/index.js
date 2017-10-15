import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Layout, Icon, Heading, Text, media } from 'react-components-kit';

import YoutubePlayer from '../../services/youtube';
import theme from '../../assets/theme';

import {
  getSelectedVideo,
  getVideoActiveStatus,
  toggleActiveStatus,
} from '../videos.ducks';

const propTypes = {
  selectedVideo: PropTypes.object,
};

class VideoDetails extends Component {
  componentDidMount() {
    this.player = new YoutubePlayer('ytPlayer');
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedVideo !== this.props.selectedVideo) {
      this.player.load(nextProps.selectedVideo.id);
    }
  }

  close = () => {
    this.player.pause();
    this.props.toggleActiveStatus();
  }

  render() {
    const { active, selectedVideo } = this.props;
    return (
      <VideoDetailsWrapper active={active} hide={!selectedVideo} column>
        <Layout.Box flex='1'>
          <Video><div id='ytPlayer' /></Video>
          {selectedVideo &&
            <Details>
              <Heading h2 color={theme.secondaryColor}>
                {selectedVideo.title}
              </Heading>
              <Text>{selectedVideo.description}</Text>
            </Details>
          }
        </Layout.Box>

        <MobileFooter justify='center'>
          <Icon
            name='ios-close'
            size='40px'
            onClick={this.close}
          />
        </MobileFooter>
      </VideoDetailsWrapper>
    );
  }
}

const VideoDetailsWrapper = styled(Layout)`
  transition: transform 0.4s ease;
  ${props => props.hide && 'display: none;'}

  ${media.tablet`
    height: 100vh;
    width: 100vw;
    position: fixed;
    top: 0px;
    left: 0px;
    background-color: #fff;
    transform: translateY(${props => props.active ? '0px' : '100%'});
  `}
`;

const Video = styled.div`
  position: relative;
  padding-bottom: 56.25%;
  height: 0;

  & > iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

const Details = styled.div`
  padding: 0px 16px;
`;

const MobileFooter = styled(Layout)`
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  display: none;

  ${media.tablet`
    display: flex;
  `}
`;

VideoDetails.propTypes = propTypes;

const mapStateToProps = state => ({
  selectedVideo: getSelectedVideo(state),
  active: getVideoActiveStatus(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  toggleActiveStatus,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(VideoDetails);

