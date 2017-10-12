export const getYoutubeSearchApi = () => {
  return window.gapi.client.youtube;
};

export const normalizeYoutubeResults = result => {
  return result.items.map(res => ({
    type: 'youtube',
    id: res.id.videoId,
    artist: res.snippet.channelTitle,
    title: res.snippet.title,
    thumbnails: res.snippet.thumbnails,
    meta: {
      etag: res.etag,
    }
  }));
};
