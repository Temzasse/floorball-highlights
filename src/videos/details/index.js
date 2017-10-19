import React from 'react';
import Media from 'react-media';
import VideoDetailsMobile from './details.mobile';
import VideoDetailsDesktop from './details.desktop';

const VideoDetailsWrapper = () => (
  <Media query='(max-width: 768px)'>
    {matches => matches
      ? <VideoDetailsMobile />
      : <VideoDetailsDesktop />}
  </Media>
);

export default VideoDetailsWrapper;
