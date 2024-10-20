import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as urls from './../../environment/environment';
import { SearchResult } from '../../utils/interfaces';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  constructor(private http: HttpClient) {}

  public getSearchToOrderView(searchWord: string) {
    return this.http.get<SearchResult>(urls.environment.apiUrlSearch, {
      params: {
        key: urls.key,
        type: 'video',
        part: 'snippet',
        order: 'viewCount',
        maxResults: 20,
        q: searchWord,
      },
    });
  }

  public getSearchToOrderDate(searchWord: string) {
    return this.http.get<SearchResult>(urls.environment.apiUrlSearch, {
      params: {
        key: urls.key,
        type: 'video',
        part: 'snippet',
        order: 'date',
        maxResults: 20,
        q: searchWord,
      },
    });
  }

  public getVideoByID(id: string) {
    return this.http.get<SearchResult>(urls.environment.apiUrlVideos, {
      params: {
        key: urls.key,
        id,
        part: 'snippet, statistics',
      },
    });
  }
}
