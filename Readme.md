# Youtube seach

Based on `https://www.npmjs.com/package/youtube-api-search-reloaded` added typecript.

Avaiable parameters : `https://developers.google.com/youtube/v3/docs/search/list#parameters`

### Required arguments

There are 2 required params there are `key` and `term`.

`type` defaults to 'video' and `part` defaults to 'snippet'. you can find more info about the parameters in the declarations file. dist/index.d.ts

### Example:

```ts
import YoutubeSearch from "youtube-api-search-typed/dist"

const params = {
  part,
  key,
  term,
  type,
  forContentOwner,
  forDeveloper,
  forMine,
  relatedToVideoId,
  channelId,
  channelType,
  eventType,
  location,
  locationRadius,
  maxResults,
  onBehalfOfContentOwner,
  order,
  pageToken,
  publishedAfter,
  regionCode,
  relevanceLanguage,
  safeSearch,
  topicId,
  videoCaption,
  videoCategoryId,
  videoDefinition,
  videoDimension,
  videoDuration,
  videoEmbeddable,
  videoLicense,
  videoSyndicated,
  videoType,
}

const searchTerm: string = "Coffee"

YoutubeSearch({
  key: API_KEY,
  term: searchTerm,
  part: "snippet",
  type: "video",
})
  .then((data) => handleVideoData(data))
  .catch((error) => handleError(error))
```

### License

MIT
