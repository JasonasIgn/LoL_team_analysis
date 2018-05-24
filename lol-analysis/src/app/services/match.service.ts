import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { MatchModel } from '../models/match.model';

@Injectable()
export class MatchService {

  constructor(private http: Http) { }
    url = "http://localhost:1756/Match/";

    SaveMatchData(id, api): Observable<MatchModel> {
        return this.http.get(this.url + id + '/' + api)
        .map((res: Response) => res.json() as MatchModel)
        .catch((error: any) => Observable.throw(error)); 
    }


}
