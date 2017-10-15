export const getYoutubeSearchApi = () => {
  return window.gapi.client.youtube;
};

export const normalizeYoutubeResults = result => {
  return result.items.map(res => ({
    id: res.id.videoId,
    channelTitle: res.snippet.channelTitle,
    title: res.snippet.title,
    thumbnails: res.snippet.thumbnails,
    description: res.snippet.description,
    publishedAt: res.snippet.publishedAt,
    meta: {
      etag: res.etag,
    }
  }));
};
