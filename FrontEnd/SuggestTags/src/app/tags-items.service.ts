import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export class RecommendationState {
  ContextItemId: string;
  Tags: TagItem[];
}

export class TagItem {
  Id: string;
  TagName: string;
}

@Injectable()
export class TagsItemsService {

  constructor(private http: HttpClient) { }

  fetchTags(itemId) {
    return this.http.get<RecommendationState>(`/sitecore/api/ssc/rectool/context/${itemId}/tags`);
  }

  showMessage(): string {
  	return "hello world";
  }

  saveTags(itemId, data) {
    console.log(itemId);
    return this.http.post(`/sitecore/api/ssc/rectool/context/${itemId}/edittags`, data);
  }
}
