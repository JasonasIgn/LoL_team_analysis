import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { GeneralData } from '../models/generaldata.model';

@Injectable()
export class GeneralDataService {

  http: any;
  constructor() { }
    url = "http://localhost:1756/GeneralData/1";
    getGeneralData(id): Observable<GeneralData> {
        return this.http.get(this.url)
        .map((res: Response) => res.json() as GeneralData)
        .catch((error: any) => Observable.throw(error)); 
    }
}
