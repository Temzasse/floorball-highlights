export default class YoutubePlayer {
  constructor(mountId) {
    this.ready = false;
    this.player = new window.YT.Player(mountId, {
      height: '360',
      width: '640',
      events: {
        'onReady': this.onPlayerReady,
      },
    });
  }

  onPlayerReady = () => {
    console.log('ON PLAYER READY');
    this.ready = true;
  }

  isReady = () => {
    return this.ready;
  }

  mute = () => {
    if (this.ready) this.player.mute();
  };

  unMute = () => {
    if (this.ready) this.player.unMute();
  };

  play = () => {
    if (this.ready) this.player.playVideo();
  };

  pause = () => {
    if (this.ready) this.player.pauseVideo();
  };

  seek = timeInSeconds => {
    if (this.ready) this.player.seekTo(timeInSeconds);
  };

  getCurrentTime = () => {
    if (!this.ready) return 0;
    return this.player.getCurrentTime();
  };

  getDuration = () => {
    if (this.ready) return 0;
    return this.player.getDuration();
  };

  reset = () => {
    if (this.ready) this.player.stopVideo();
  };

  load = videoId => {
    if (this.ready) this.player.loadVideoById({ videoId });
  };
}
