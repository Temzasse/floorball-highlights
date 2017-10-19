import { getYoutubeSearchApi } from './utils';

export const fetchTeamVideos = channelId => {
  const yt = getYoutubeSearchApi();
  return yt.search.list({
    channelId,
    part: 'snippet',
    maxResults: 30,
    order: 'date',
  });
};

export const fetchXTeamVideos = channelId => {
  const yt = getYoutubeSearchApi();
  return yt.search.list({
    channelId,
    part: 'snippet',
    maxResults: 30,
    order: 'date',
  });
};
