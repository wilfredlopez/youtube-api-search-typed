import axios from 'axios';
import { Options, Video } from '../models';

const ROOT_URL = 'https://www.googleapis.com/youtube/v3/search';

export const youtubeSearch = async function (
  options: Options,
  callback?: (video: Video[] | null) => void,
): Promise<Video[] | null> {
  if (!options.key || !options.term) {
    throw new Error('Youtube Search expected key and term, received undefined');
  }

  if (!options.part) {
    options.part = 'snippet';
  }
  if (!options.type) {
    options.type = 'video';
  }

  const params = {
    // part: options.part,
    // key: options.key,
    q: options.term,
    // type: options.type,
    ...options,
  };

  return axios
    .get<{ items: Video[] }>(ROOT_URL, { params })
    .then((response) => {
      if (callback) {
        callback(response.data.items);
      }
      return response.data.items;
    })
    .catch((error) => {
      if (callback) {
        callback(null);
      }
      // console.error(error);
      return null;
    });
};

export default youtubeSearch;
