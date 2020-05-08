import fetch from 'isomorphic-unfetch';
import { URL, URLSearchParams } from 'url';

export const ROOT_URL = 'https://www.googleapis.com/youtube/v3/search';

export interface Video {
  etag: string;
  id: {
    videoId: string;
    kind: string;
  };
  kind: string;
  snippet: {
    title: string;
    description: string;
    channelId: string;
    channelTitle: string;
    liveBroadcastContent: string;
    /**
     * example "2018-05-10T00:45:24.000Z"
     */
    publishedAt: string;
    thumbnails: {
      default: Thumbnail;
      high: Thumbnail;
      medium: Thumbnail;
    };
  };
}

export interface Thumbnail {
  url: string;
  height: number;
  width: number;
}

// type BoolString = 'true' | 'false';
export type VidDefinition = 'any' | 'high' | 'standard';
export type AnyOrTrue = 'any' | 'true';
export type VideoOrder = 'date' | 'rating' | 'relevance' | 'title' | 'videoCount' | 'viewCount';
export interface Options extends NodeJS.Dict<string | boolean> {
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
export const youtubeSearch = (options: Options) => new Promise<Video[]>((resolve, reject) => {
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
