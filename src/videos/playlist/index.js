import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { getYoutubeSearchApi } from '../../services/utils';

const propTypes = {
  something: PropTypes.any,
};

class Playlist extends Component {
  state = {
    videos: [],
  }

  componentWillMount() {
    const yt = getYoutubeSearchApi();
    yt.search.list({
      channelId: 'UC54IfFpVqGZWqMk9B93QO7g',
      part: 'snippet',
      maxResults: 20,
      order: 'date',
    }).then(({ result }) => this.setState({ videos: result.items }));
  }

  render() {
    const { videos } = this.state;
    console.debug('[videos]', videos);

    return (
      <PlaylistWrapper>
        <Heading>Videot</Heading>

        <Videos>
          {videos.map(({ id, snippet }) =>
            <VideoRow key={id.videoId}>
              <Thumbnail
                src={snippet.thumbnails.default.url}
                w={snippet.thumbnails.default.width}
                h={snippet.thumbnails.default.height}
              />
              <Info>
                {snippet.title}
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
  padding: 16px 32px;
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
`;

const Thumbnail = styled.img`
  width: ${props => props.w}px;
  height: ${props => props.h}px;
  max-width: 100%;
  margin-right: 16px;
  border-radius: 4px;
`;

const Info = styled.div`
  flex: 1;
`;

Playlist.propTypes = propTypes;

export default Playlist;
