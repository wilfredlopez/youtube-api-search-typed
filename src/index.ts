import fetch from 'isomorphic-unfetch';
import { URL, URLSearchParams } from 'url';

export const ROOT_URL = 'https://www.googleapis.com/youtube/v3/search';

export interface ResourceInfo {
  /**
   * Contains information about an action that a particular user has taken on the YouTube site. User actions that are reported in activity feeds include rating a video, sharing a video, marking a video as a favorite, and posting a channel bulletin, among others.
   */
  activity: string;
  /**
   * Contains information about a single YouTube channel.
   */
  channel: string;
  /**
   * Identifies the URL to use to set a newly uploaded image as the banner image for a channel.
   */
  channelBanner: string;
  /**
   * Contains information about a set of videos that a channel has chosen to feature. For example, a section could feature a channel's latest uploads, most popular uploads, or videos from one or more playlists.
   */
  channelSection: string;
  /**
   * Identifies a category that YouTube associates with channels based on their content or other indicators, such as popularity. Guide categories seek to organize channels in a way that makes it easier for YouTube users to find the content they're looking for. While channels could be associated with one or more guide categories, they are not guaranteed to be in any guide categories.
   */
  guideCategory: string;
  /**
   * Identifies an application language that the YouTube website supports. The application language can also be referred to as a UI language.
   */
  i18nLanguage: string;
  /**
   * Identifies a geographic area that a YouTube user can select as the preferred content region. The content region can also be referred to as a content locale.
   */
  i18nRegion: string;
  /**
   * 	Represents a single YouTube playlist. A playlist is a collection of videos that can be viewed sequentially and shared with other users.
   */
  playlist: string;
  /**
   * Identifies a resource, such as a video, that is part of a playlist. The playlistItem resource also contains details that explain how the included resource is used in the playlist.
   */
  playlistItem: string;
  /**
   * Contains information about a YouTube video, channel, or playlist that matches the search parameters specified in an API request. While a search result points to a uniquely identifiable resource, like a video, it does not have its own persistent data.
   */
  'search result': string;
  /**
   * Contains information about a YouTube user subscription. A subscription notifies a user when new videos are added to a channel or when another user takes one of several actions on YouTube, such as uploading a video, rating a video, or commenting on a video.
   */
  subscription: string;
  /**
   * Identifies thumbnail images associated with a resource.
   */
  thumbnail: string;
  /**
   * 	Represents a single YouTube video.
   */
  video: string;
  /**
   * 	Identifies a category that has been or could be associated with uploaded videos.
   */
  videoCategory: string;
  /**
   * Identifies an image that displays during playbacks of a specified channel's videos. The channel owner can also specify a target channel to which the image links as well as timing details that determine when the watermark appears during video playbacks and then length of time it is visible.
   */
  watermark: string;
}

export type ResourceType = keyof ResourceInfo;

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

export type VideoResourcePart =
  | 'snippet'
  | 'contentDetails'
  | 'fileDetails'
  | 'player'
  | 'processingDetails'
  | 'recordingDetails'
  | 'statistics'
  | 'suggestions'
  | 'topicDetails';

// type BoolString = 'true' | 'false';
export type VidDefinition = 'any' | 'high' | 'standard';
export type AnyOrTrue = 'any' | 'true';
export type VideoOrder = 'date' | 'rating' | 'relevance' | 'title' | 'videoCount' | 'viewCount';
export interface Options extends NodeJS.Dict<string | boolean> {
  /**
   * The part parameter specifies a comma-separated list of one or more search resource properties that the API response will include.
   *
   * Set the parameter value to snippet. Or For example, a video resource has the following parts:
   *
   @argument snippet
   @argument contentDetails
   @argument fileDetails
   @argument player
   @argument processingDetails
   @argument recordingDetails
   @argument statistics
   @argument suggestions
   * @argument topicDetails
   *
   * @default snippet
   */
  part?: VideoResourcePart | string;
  key: string;
  term: string;
  /**
   * default to video
   * @default video
   */
  type?: ResourceType;
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
  if (!options.key || !options.term) {
    reject(new Error('Please make sure that the required fields are inserted'));
  }
  options.type = options.type || 'video';
  options.part = options.part || 'snippet';

  const url = new URL(ROOT_URL);
  const search = new URLSearchParams(options as any);
  url.search = search as any;

  fetch(url.href)
    .then((response) => resolve(response.json()))
    .catch(reject);
});

export default youtubeSearch;
