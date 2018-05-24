import { Component, OnInit } from '@angular/core';
import { GeneralData } from '../../models/generaldata.model';
import { Observable, BehaviorSubject } from 'rxjs/';
import { GeneralDataService } from '../../services/general.service';
import { MatchService } from '../../services/match.service';
import { MatchModel } from '../../models/match.model';

@Component({
  selector: 'app-collect-data',
  templateUrl: './collect-data.component.html',
  styleUrls: ['./collect-data.component.css']
})
export class CollectDataComponent implements OnInit {

  constructor(private generalDataService: GeneralDataService,
                private matchService: MatchService) { }
  generalData: GeneralData = new GeneralData;
  
  ngOnInit() {

    this.generalDataService.getGeneralData(1).subscribe((response: GeneralData) => {
      this.generalData = response;
    });

  }
  
  ExtractData(api: string)
  {
      this.matchService.SaveMatchData(this.generalData.currentMatchId, api).subscribe((res: MatchModel) => {
        console.log(res);
      });
      this.generalData.currentMatchId = this.generalData.currentMatchId + 1;
      this.generalDataService.updateGeneralData(this.generalData).subscribe((res: GeneralData) => {
        console.log(res);
      });;
      
  }

}
