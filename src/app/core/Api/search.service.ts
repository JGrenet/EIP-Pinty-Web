import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import {environment} from '../../../environments/environment';
import {PlaceResult} from './Model/PlaceResult';
import {ProfileResult} from './Model/ProfileResult';

@Injectable()
export class SearchService {

  serverUrl: string;

  constructor(private http: HttpClient) {
    this.serverUrl = environment.serverUrl + 'search/';
  }

  public SearchPlace(query: string): Observable<PlaceResult> {
    return this.http.post<PlaceResult>(this.serverUrl + 'places/', {
      query: query
    })
      .map((json: any) => new PlaceResult(
        json.data.nextPageToken,
        json.data.results
      ));
  }

  public SearchProfile(query: string): Observable<ProfileResult> {
    return this.http.post<ProfileResult>(this.serverUrl + 'users/', {
      query: query
    })
      .map((json: any) => new ProfileResult(
        json.data.results
      ));
  }
}
