import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Layout from 'react-components-kit/dist/Layout';
import Icon from 'react-components-kit/dist/Icon';
import Heading from 'react-components-kit/dist/Heading';
import Text from 'react-components-kit/dist/Text';
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
      if (!this.player.isReady()) {
        setTimeout(() => {
          this.player.load(nextProps.selectedVideo.id);
        }, 1000);
      } else {
        this.player.load(nextProps.selectedVideo.id);
      }
    }
  }

  close = () => {
    this.player.pause();
    this.props.disableActiveStatus();
  }

  render() {
    const { active, selectedVideo, selectedVideoTeam } = this.props;
    return (
      <VideoDetailsWrapper column active={active}>
        <Header>
          <Icon
            name='ios-close-outline'
            size='32px'
            onClick={this.close}
            color={theme.primaryColor}
            touchable
          />
        </Header>

        <Layout.Box>
          <Video>
            <div id='ytPlayer' />
          </Video>

          {selectedVideo &&
            <Details column>
              <Heading h3 color={theme.secondaryColor}>
                {selectedVideo.title}
              </Heading>
              <Text size='14px'>{selectedVideo.description}</Text>
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
                    <Text size='12px' color='#888'>
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
        {/*
        <Footer justify='center'>
          <Icon
            name='ios-close'
            size='40px'
            onClick={this.close}
            color={theme.primaryColor}
          />
        </Footer>
        */}
      </VideoDetailsWrapper>
    );
  }
}

const VideoDetailsWrapper = styled(Layout)`
  height: 100vh;
  width: 100vw;
  z-index: 10;
  position: fixed;
  top: 0px;
  left: 0px;
  background-color: #fff;
  overflow-x: hidden;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  transition: transform 0.3s ease, visibility 0.3s;
  transform: translateY(${props => props.active ? '0px' : '100%'});
  visibility: ${props => props.active ? 'visible' : 'hidden'};
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
  padding: 0px 16px;
`;

// const Footer = styled(Layout)`
//   padding: 16px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

const Header = styled(Layout)`
  flex: none;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const TeamLogo = styled.div`
  height: 40px;
  width: 40px;
  border-radius: 8px;
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

