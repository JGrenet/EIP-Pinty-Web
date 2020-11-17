import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {MediaItem} from './Model/Media';

class Feedback {
  constructor(public id: string, public userID: string, public object: string, public message: string, public media: MediaItem[]) {
  }
}

@Injectable()
export class FeedbackService {
  serverUrl: string;

  constructor(private http: HttpClient) {
    this.serverUrl = environment.serverUrl + 'feedback/';
  }

  public CreateFeedback(authorID: string, title: string, content: string, media: String[] = []): Observable<Feedback> {
    return this.http.put<Feedback>(this.serverUrl + 'create', {
      authorID: authorID,
      title: title,
      content: content,
      media: media
    })
      .map((json: any) => new Feedback(
        json.data.id,
        json.data.authorID,
        json.data.title,
        json.data.content,
        json.data.media
      ));
  }
}
