import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Layout from 'react-components-kit/dist/Layout';
import Heading from 'react-components-kit/dist/Heading';
import Text from 'react-components-kit/dist/Text';
import Divider from 'react-components-kit/dist/Divider';
import Gutter from 'react-components-kit/dist/Gutter';
import format from 'date-fns/format';
import fiLocale from 'date-fns/locale/fi';

import EmptyState from '../../common/EmptyState';
import YoutubePlayer from '../../services/youtube';
import theme from '../../assets/theme';
import logoMapper from '../../logoMapper';
import playImg from '../../assets/play.svg';

import {
  getSelectedVideo,
  getSelectedVideoTeam,
  getVideoActiveStatus,
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
      if (!this.player.isReady) {
        setTimeout(() => {
          this.player.load(nextProps.selectedVideo.id);
        }, 1000);
      } else {
        this.player.load(nextProps.selectedVideo.id);
      }
    }
  }

  render() {
    const { selectedVideo, selectedVideoTeam } = this.props;

    return [
      !selectedVideo
        ? <EmptyState img={playImg} text='Valitse video listasta' />
        : null,
      <VideoDetailsWrapper column visible={!!selectedVideo}>
        <Layout.Box>
          <Video>
            <div id='ytPlayer' />
          </Video>

          {selectedVideo &&
            <Layout column>
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
            </Layout>
          }
        </Layout.Box>
      </VideoDetailsWrapper>
    ];
  }
}

const VideoDetailsWrapper = styled(Layout)`
  display: ${props => props.visible ? 'flex' : 'none'};
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

export default connect(mapStateToProps)(VideoDetails);

