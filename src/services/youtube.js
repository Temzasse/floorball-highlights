export default class YoutubePlayer {
  constructor(mountId) {
    this.player = new window.YT.Player(mountId, {
      height: '360',
      width: '640',
    });
  }

  mute = () => {
    this.player.mute();
  };

  unMute = () => {
    this.player.unMute();
  };

  play = () => {
    this.player.playVideo();
  };

  pause = () => {
    this.player.pauseVideo();
  };

  seek = timeInSeconds => {
    this.player.seekTo(timeInSeconds);
  };

  getCurrentTime = () => {
    return this.player.getCurrentTime();
  };

  getDuration = () => {
    return this.player.getDuration();
  };

  reset = () => {
    this.player.stopVideo();
  };

  load = videoId => {
    this.player.loadVideoById({ videoId });
  };
}
