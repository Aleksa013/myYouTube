export interface SearchResult {
  kind: string;
  etag: string;
  pageInfo: PageInfo;
  items: VideoItem[];
}

export interface Video {
  kind: string;
  etag: string;
  id: ID;
  snippet: Snippet;
  channelTitle: string;
  liveBroadcastContent: string;
  publishTime: string;
  statistics: StatisticsData;
}

export interface VideoItem {
  kind: string;
  etag: string;
  id: ID;
  snippet: Snippet;
  channelTitle: string;
  liveBroadcastContent: string;
  publishTime: string;
  statistics: StatisticsData;
}

interface Snippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: Thumbnails;
  channelTitle: string;
  tags: string[];
  categoryId: string;
  defaultLanguage?: string;
  liveBroadcastContent: string;
  localized: LocalizedData;
  defaultAudioLanguage: string;
}

interface Thumbnails {
  default: ThumbnailData;
  medium: ThumbnailData;
  high: ThumbnailData;
  standard: ThumbnailData;
  maxres: ThumbnailData;
}

interface ThumbnailData {
  url: string;
  width: number;
  height: number;
}

interface LocalizedData {
  title: string;
  description: string;
}

export interface StatisticsData {
  viewCount?: string;
  likeCount: string;
  dislikeCount: string;
  favoriteCount: string;
  commentCount: string;
}

export interface ID {
  kind: string;
  videoId: string;
}
interface PageInfo {
  totalResults: number;
  resultsPerPage: number;
}

export interface AppStore {
  auth: AuthState;
  search: SearchState;
  videos: VideoState;
  myVideos: MyVideosState;
  favoriteVideos: FavoriteState;
}

export interface AuthState {
  isAuth: boolean;
  userName: string | undefined;
}

export interface SearchState {
  searchWord: string;
  isNew: boolean;
  error: string;
}

export interface VideoState {
  videos: VideoItem[];
  nextPageToken: string;
  prevPageToken: string;
}

export interface MyVideosState {
  myVideo: VideoItem[];
}

export interface FavoriteState {
  favorite: VideoItem[];
  lastAdded: string;
  lastRemoved: string;
}
