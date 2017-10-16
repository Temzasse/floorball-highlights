import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Layout from 'react-components-kit/dist/Layout';
import Icon from 'react-components-kit/dist/Icon';
import Heading from 'react-components-kit/dist/Heading';
import Text from 'react-components-kit/dist/Text';
import media from 'react-components-kit/dist/media';
import Divider from 'react-components-kit/dist/Divider';
import Gutter from 'react-components-kit/dist/Gutter';
import format from 'date-fns/format';
import fiLocale from 'date-fns/locale/fi';

import YoutubePlayer from '../../services/youtube';
import theme from '../../assets/theme';
import logoMapper from '../../logoMapper';

import {
  getSelectedVideo,
  getSelectedVideoTeam,
  getVideoActiveStatus,
  disableActiveStatus,
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
    this.props.disableActiveStatus();
  }

  render() {
    const { active, selectedVideo, selectedVideoTeam } = this.props;
    return (
      <VideoDetailsWrapper active={active} hide={!selectedVideo} column>
        <Layout.Box>
          <Video><div id='ytPlayer' /></Video>
          {selectedVideo &&
            <Details column>
              <Heading h2 color={theme.secondaryColor}>
                {selectedVideo.title}
              </Heading>
              <Text>{selectedVideo.description}</Text>
              <Divider />
              <Layout align='center'>
                <Layout.Box>
                  <TeamLogo logo={logoMapper[selectedVideoTeam.id]} />
                </Layout.Box>
                <Gutter />
                <Layout.Box flex='1'>
                  <Layout column>
                    <Text size='18px' bold>
                      {selectedVideoTeam.name}
                    </Text>
                    <Text size='14px' color='#888'>
                      Julkaistu:&nbsp;
                      {format(
                        new Date(selectedVideo.publishedAt),
                        'Do MMMM YYYY',
                        { locale: fiLocale },
                      )}
                    </Text>
                  </Layout>
                </Layout.Box>
              </Layout>
            </Details>
          }
        </Layout.Box>

        <MobileFooter justify='center'>
          <Icon
            name='ios-close'
            size='40px'
            onClick={this.close}
            color={theme.primaryColor}
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
    z-index: 10;
    position: absolute;
    top: 0px;
    left: 0px;
    background-color: #fff;
    transform: translateY(${props => props.active ? '0px' : '100%'});
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
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

const Details = styled(Layout)`
  ${media.tablet`
    padding: 0px 16px;
  `}
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

const TeamLogo = styled.div`
  height: 80px;
  width: 80px;
  border-radius: 16px;
  border: 1px solid #ccc;
  background-color: #f5f5f5;
  background-image: url(${props => props.logo});
  background-position: center center;
  background-size: contain;
  background-repeat: no-repeat;
`;

VideoDetails.propTypes = propTypes;

const mapStateToProps = state => ({
  selectedVideo: getSelectedVideo(state),
  selectedVideoTeam: getSelectedVideoTeam(state),
  active: getVideoActiveStatus(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  disableActiveStatus,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(VideoDetails);

