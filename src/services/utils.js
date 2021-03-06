import update from 'immutability-helper';

export const getYoutubeSearchApi = () => {
  return window.gapi.client.youtube;
};

export const normalizeYoutubeResults = (result, team) => {
  return result.items.map(res => ({
    id: res.id.videoId,
    channelTitle: res.snippet.channelTitle,
    title: res.snippet.title,
    thumbnails: res.snippet.thumbnails,
    description: res.snippet.description,
    publishedAt: res.snippet.publishedAt,
    meta: { etag: res.etag },
    team,
  }));
};

const invalidTerms = [
  'pressi', 'lehdist', 'lkipelit', 'heimosoturit', 'haastat'
];

const highlightsTerms = ['highlights', 'kooste'];

export const filterVideos = videos => {
  return videos.filter(({ title }) => {
    const t = title.toLowerCase();
    let isValid = true;

    invalidTerms.forEach(term => {
      if (t.includes(term)) isValid = false;
    });

    highlightsTerms.forEach(term => {
      if (t.includes(term)) isValid = true;
    });

    return isValid;
  });
};

export const getSettings = () => {
  try {
    const s = localStorage.getItem('settings');
    if (!s) return {};
    return JSON.parse(s) || {};
  } catch (e) {
    return {};
  }
};

export const updateSettings = partial => {
  const settings = getSettings();
  const newSettings = update(settings, { $merge: partial });
  localStorage.setItem('settings', JSON.stringify(newSettings));
};
