import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { environment } from '../../../environments/environment';
import { AdminUsersList } from './Model/AdminUsersList';
import { AdminPlacesList } from './Model/AdminPlacesList';
import { AdminMediasList } from './Model/AdminMediasList';
import { AdminFeedbacksList } from './Model/AdminFeedbacksList';
import { AdminReviewsList } from './Model/AdminReviewsList';

@Injectable()
export class BackOfficeService {
  serverUrl: string;

  constructor(private http: HttpClient) {
    this.serverUrl = environment.serverUrl + 'backoffice/';
  }

  public GetUsers(formFilters: any): Observable<AdminUsersList> {
    const filters = this.filtersToUrl(formFilters);
    return this.http.get<AdminUsersList>(this.serverUrl + 'user/list?' + filters)
      .map((json: any) => new AdminUsersList(
        json.data.results
      ));
  }

  public GetPlaces(formFilters: any): Observable<AdminPlacesList> {
    const filters = this.filtersToUrl(formFilters);
    return this.http.get<AdminPlacesList>(this.serverUrl + 'place/list?' + filters)
      .map((json: any) => new AdminPlacesList(
        json.data.results
      ));
  }

  public GetMedias(formFilters: any): Observable<AdminMediasList> {
    const filters = this.filtersToUrl(formFilters);
    return this.http.get<AdminMediasList>(this.serverUrl + 'media/list?' + filters)
      .map((json: any) => new AdminMediasList(
        json.data.results
      ));
  }

  public GetFeedbacks(formFilters: any): Observable<AdminFeedbacksList> {
    const filters = this.filtersToUrl(formFilters);
    return this.http.get<AdminFeedbacksList>(this.serverUrl + 'feedback/list?' + filters)
      .map((json: any) => new AdminFeedbacksList(
        json.data.results
      ));
  }

  public GetReviews(formFilters: any): Observable<AdminReviewsList> {
    const filters = this.filtersToUrl(formFilters);
    return this.http.get<AdminReviewsList>(this.serverUrl + 'review/list?' + filters)
      .map((json: any) => new AdminReviewsList(
        json.data.results
      ));
  }

  private filtersToUrl(formFilters: any) {
    let filters = '';
    Object.entries(formFilters).map((control, n) => {
      let key = '';
      if (n > 0) {
        key += '&';
      }
      filters += key + control[0] + '=' + control[1];
    });
    return filters;
  }
}
