import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import format from 'date-fns/format';
import Text from 'react-components-kit/dist/Text';
import Gutter from 'react-components-kit/dist/Gutter';
import Layout from 'react-components-kit/dist/Layout';
import media from 'react-components-kit/dist/media';
import fiLocale from 'date-fns/locale/fi';

import { getVideosBySelectedTeam, selectVideo } from '../videos.ducks';
import { getSelectedTeam } from '../../teams/teams.ducks';

const propTypes = {
  videos: PropTypes.array.isRequired,
  selectedTeam: PropTypes.object,
};

class Playlist extends Component {
  render() {
    const { videos, selectedTeam } = this.props;

    return (
      <PlaylistWrapper>
        <Heading>{selectedTeam.name} videot</Heading>

        <Videos>
          {videos.map(video =>
            <VideoRow
              key={video.id}
              onClick={() => this.props.selectVideo(video)}
            >
              <Thumbnail img={video.thumbnails.medium.url} />
              <Info column>
                <Text size='14px' bold>
                  {video.title}
                </Text>
                <Gutter vertical amount='8px' />
                <Text size='14px'>
                  {format(
                    new Date(video.publishedAt),
                    'Do MMMM YYYY',
                    { locale: fiLocale },
                  )}
                </Text>
              </Info>
            </VideoRow>
          )}
        </Videos>
      </PlaylistWrapper>
    );
  }
}

const PlaylistWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Heading = styled.h2`
  font-size: 24px;
  margin: 0px;
`;

const Videos = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 16px;
`;

const VideoRow = styled.div`
  display: flex;
  margin-bottom: 16px;
  background-color: #fff;
  cursor: pointer;
  border-radius: 4px;

  ${media.tablet`
    margin-bottom: 32px;
  `}

  &:hover {
    background-color: #f5f5f5;
  }

  &:active {
    background-color: #eee;
  }
`;

const Thumbnail = styled.div`
  width: 140px;
  height: 90px;
  background-color: #eee;
  background-image: url(${props => props.img});
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  max-width: 100%;
  border-radius: 4px;

  ${media.tablet`
    width: 105px;
    height: 67px;
  `}
`;

const Info = styled(Layout)`
  flex: 1;
  padding: 8px 16px;

  ${media.tablet`
    padding: 0px;
    padding-left: 12px;
  `}
`;

Playlist.propTypes = propTypes;

const mapStateToProps = state => ({
  videos: getVideosBySelectedTeam(state),
  selectedTeam: getSelectedTeam(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  selectVideo,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Playlist);
