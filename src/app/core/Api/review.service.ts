import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {environment} from '../../../environments/environment';
import {Review, ReviewAuthor} from './Model/Reviews';
import {MediaItem} from './Model/Media';

@Injectable()
export class ReviewService {
  serverUrl: string;

  constructor(private http: HttpClient) {
    this.serverUrl = environment.serverUrl + 'review/';
  }

  public CreateReview(_authorId: string, _placeID: string, _rating: number, _message: string, _medias: String[] = []): Observable<Review> {
    console.log(_authorId);
    return this.http.put<Review>(this.serverUrl + 'create', {
      authorID: _authorId,
      placeID: _placeID,
      rating: _rating,
      message: _message,
      medias: _medias
    })
      .map((json: any) => new Review(
        json.data.id,
        json.data.type,
        json.data.author,
        json.data.rating,
        json.data.message,
        json.data.place,
        json.data.medias,
        json.data.created
      ));
  }

  public EditReview(_id: string, _authorId: string, _rating: number, _message: string): Observable<Review> {
    return this.http.patch<Review>(this.serverUrl + 'id/' + _id + '/review/edit/', {
      authorID: _authorId,
      rating: _rating,
      message: _message
    })
      .map((json: any) => new Review(
        json.data.id,
        json.data.type,
        json.data.author,
        json.data.rating,
        json.data.message,
        json.data.place,
        [],
        json.data.created
      ));
  }

  public DeleteReview(_id: string): Observable<boolean> {
    return this.http.delete<Review>(this.serverUrl + 'id/' + _id + '/delete/', {})
      .map(() => true);
  }
}
