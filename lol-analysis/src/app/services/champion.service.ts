import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { GeneralData } from '../models/generaldata.model';
import { ChampionModel } from '../models/champion.model';

@Injectable()
export class GeneralDataService {

  constructor(private http: Http) { }
    url = "http://localhost:1756/Champion";
    getChampions(api): Observable<ChampionModel[]> {
        return this.http.get(this.url + '/' + api)
        .map((res: Response) => res.json() as ChampionModel[])
        .catch((error: any) => Observable.throw(error)); 
    }
}
