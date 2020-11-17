import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {Suggestion, Suggestions} from './Model/Suggestion';
import {Reviews} from './Model/Reviews';

@Injectable()
export class IaService {
  serverUrl: string;

  constructor(private http: HttpClient) {
    this.serverUrl = environment.serverUrl + 'ia/';
  }

  public GetSuggestionOfTheDay(_id: string, _latitude: number, _longitude: number): Observable<Suggestions> {
    return this.http.post<Suggestion>(this.serverUrl + 'suggestion/' + _id + '/', {
      latitude: _latitude,
      longitude: _longitude
    })
      .map((json: any) => new Suggestions(
          json.data.results
        ));
  }

  public RateSuggestion(_id: string, _userID: string, _note: number): Observable<boolean> {
    return this.http.patch(this.serverUrl + 'suggestion/' + _id + '/note/', {
      userID: _userID,
      note: _note
    })
      .map(() => true);
  }
}
