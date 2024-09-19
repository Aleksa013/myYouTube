import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as urls from './../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  constructor(private http: HttpClient) {}

  public getSearch(searchWord: string) {
    return this.http.get(urls.environment.apiUrlSearch, {
      params: {
        key: urls.key,
        type: 'video',
        part: 'snippet',
        order: 'viewCount',
        maxResults: 30,
        q: searchWord,
      },
    });
  }
}
