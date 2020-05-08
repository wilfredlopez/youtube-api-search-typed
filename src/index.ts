import fetch from 'isomorphic-unfetch';
import { URL, URLSearchParams } from 'url';

export const ROOT_URL = 'https://www.googleapis.com/youtube/v3/search';

// type BoolString = 'true' | 'false';
type VidDefinition = 'any' | 'high' | 'standard';
type AnyOrTrue = 'any' | 'true';
type VideoOrder = 'date' | 'rating' | 'relevance' | 'title' | 'videoCount' | 'viewCount';
interface Options extends NodeJS.Dict<string | boolean> {
  part: string;
  key: string;
  term: string;
  type: string;
  forContentOwner?: boolean;
  forDeveloper?: boolean;
  forMine?: boolean;
  relatedToVideoId?: string;
  channelId?: 'any' | 'show';
  channelType?: 'completed' | 'live' | 'upcoming';
  eventType?: string;
  location?: string;
  locationRadius?: string;
  maxResults?: string;
  onBehalfOfContentOwner?: string;
  order?: VideoOrder;
  pageToken?: string;
  /**
   * The publishedAfter parameter indicates that the API response should only contain resources created at or after the specified time. The value is an RFC 3339 formatted date-time value (1970-01-01T00:00:00Z).
   */
  publishedAfter?: string;
  /**
   * The publishedBefore parameter indicates that the API response should only contain resources created before or at the specified time. The value is an RFC 3339 formatted date-time value (1970-01-01T00:00:00Z).
   */
  publishedBefore?: string;
  regionCode?: string;
  relevanceLanguage?: string;
  safeSearch?: 'moderate' | 'none' | 'strict';
  topicId?: string;
  videoCaption?: 'any' | 'closedCaption' | 'none';
  videoCategoryId?: string;
  videoDefinition?: VidDefinition;
  videoDimension?: '2d' | '3d' | 'any';
  videoDuration?: 'any' | 'long' | 'medium' | 'short';
  videoEmbeddable?: AnyOrTrue;
  videoLicense?: 'any' | 'creativeCommon' | 'youtube';
  videoSyndicated?: AnyOrTrue;
  videoType?: 'any' | 'episode' | 'movie';
}
export const youtubeSearch = (options: Options) => new Promise((resolve, reject) => {
  if (!options.key || !options.term || !options.part || !options.type) {
    reject(new Error('Please make sure that the required fields are inserted'));
  }

  const url = new URL(ROOT_URL);
  const search = new URLSearchParams(options as any);
  url.search = search as any;

  fetch(url.href)
    .then((response) => resolve(response.json()))
    .catch(reject);
});

export default youtubeSearch;
