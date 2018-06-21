import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export class RecommendationState {
  ContextItemId: string;
  ProfileKeys: ProfileKeyItem[];
}

export class ProfileKeyItem {
  ProfileKeyId: string;
  ProfileKeyName: string;
}

@Injectable()
export class ProfileKeysItemsService {

  constructor(private http: HttpClient) { }

  fetchProfileKeys(itemId) {
    return this.http.get<RecommendationState>(`/sitecore/api/ssc/rectool/context/${itemId}/profiles`);
  }

  showMessage(): string {
  	return "hello world";
  }

  saveProfileKeys(itemId, data) {
    console.log(itemId);
    return this.http.post(`/sitecore/api/ssc/rectool/context/${itemId}/editprofilekeys`, data);
  }
}
