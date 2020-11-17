import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { PlacesAround } from './Model/PlacesAround';
import { PlaceInfo } from './Model/PlaceInfo';
import { Reviews } from './Model/Reviews';
import {environment} from '../../../environments/environment';
import Media from './Model/Media';


@Injectable()
export class PlaceService {
  serverUrl: string;

  constructor(private http: HttpClient) {
    this.serverUrl = environment.serverUrl + 'place/';
  }

  public GetPlacesAround(longitude: number, latitude: number, radius: number, type: string):  Observable<PlacesAround> {
    return this.http.post<PlacesAround>(this.serverUrl + 'around/list', {
      longitude: longitude,
      latitude: latitude,
      radius: radius,
      type: type
    })
      .map((json: any) => new PlacesAround(
        json.data.nextPageToken,
        json.data.results
      ));
  }

  public GetPlaceAroundByPageToken(pageToken: string, longitude: string, latitude: string): Observable<PlacesAround> {
    return this.http.post<PlacesAround>(this.serverUrl + 'around/list/' + pageToken, {
      longitude: longitude,
      latitude: latitude
    })
      .map((json: any) => new PlacesAround(
        json.data.nextPageToken,
        json.data.results
      ));
  }

  public GetPlaceInfo(placeId: string): Observable<PlaceInfo> {
    return this.http.get<PlaceInfo>(this.serverUrl + 'id/' + placeId + '/info')
      .map((json: any) => new PlaceInfo(
        json.data.id,
        json.data.placeID,
        json.data.name,
        json.data.formattedAddress,
        json.data.location,
        json.data.phone,
        json.data.priceLevel,
        json.data.rating,
        json.data.googleRating,
        json.data.url,
        json.data.website,
        json.data.lastRequest,
        json.data.types,
        json.data.openingHours,
        json.data.compatibility,
        json.data.subs,
        json.data.image,
        json.data.friends
      ));
  }

  public GetReviewsByPlaceID(placeId: string): Observable<Reviews> {
    return this.http.get<Reviews>(this.serverUrl + 'id/' + placeId + '/reviews')
      .map((json: any) => new Reviews(
        json.data.results
      ));
  }

  public GetMediasByPlaceID(placeId: string): Observable<Media> {
    return this.http.get<Media>(this.serverUrl + 'id/' + placeId + '/medias')
      .map((json: any) => new Media(
        json.data.results
      ));
  }
}
