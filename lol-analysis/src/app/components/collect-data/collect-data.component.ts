import { Component, OnInit, OnDestroy } from '@angular/core';
import { GeneralData } from '../../models/generaldata.model';
import { Observable, BehaviorSubject, Subscription } from 'rxjs/';
import { GeneralDataService } from '../../services/general.service';
import { MatchService } from '../../services/match.service';
import { MatchModel } from '../../models/match.model';

@Component({
  selector: 'app-collect-data',
  templateUrl: './collect-data.component.html',
  styleUrls: ['./collect-data.component.css']
})
export class CollectDataComponent implements OnInit, OnDestroy {


  generalData: GeneralData = new GeneralData;
  loading: boolean = false;
  notice: number = 0;
  newTeam: boolean = true;
  updateTeam: boolean = true;
  notFound: boolean = true;
  badMap: boolean = true;
  notRanked: boolean = true;
  lowRank: boolean = true;
  loops: number = 0;
  newTeams: number = 0;
  updatedTeams: number = 0;
  matchesAnalysed: number = 0;

  loopSubscription: Subscription;


  constructor(private generalDataService: GeneralDataService,
                private matchService: MatchService) { }

  ngOnInit() {

    this.generalDataService.getGeneralData(1).subscribe((response: GeneralData) => {
      this.generalData = response;
      console.log(this.generalData.apiKey);
    });

  }
  ngOnDestroy()
  {

  }
  
  Loop(loops:number)
  {
    //this.loading = true;
    this.loops = loops;
    this.updatedTeams = 0;
    this.newTeams = 0;
    this.matchesAnalysed = 0;
    if (this.loops > 0)
    {
      this.loopSubscription = Observable.interval(2000).subscribe(x => {
        if (this.loading == false)
        {
          this.ExtractData();
          this.loops--;
        }
        if (this.loops <= 0)
        {
          this.loading = false;
          this.loopSubscription.unsubscribe();
        } 
      });
    }
  }
  ExtractData()
  {
      this.updateTeam = true;
      this.newTeam = true;
      this.notFound = true;
      this.badMap = true;
      this.notRanked = true;
      this.lowRank = true;

      this.loading = true;
        this.matchService.SaveMatchData(this.generalData.currentMatchId, this.generalData.apiKey).subscribe((res: any) => {
          console.log(res);
          this.matchesAnalysed++;
          if (res == 0)
          {
            this.updateTeam = true;
            this.newTeam = false;
            this.notFound = true;
            this.badMap = true;
            this.notRanked = true;
            this.lowRank = true;
            this.generalData.totalTeamCombinations = this.generalData.totalTeamCombinations + 1;
            this.newTeams++;
          } 
          else if (res == 1)
          {
            this.updateTeam = false;
            this.newTeam = true;
            this.notFound = true;
            this.notRanked = true;
            this.badMap = true;
            this.lowRank = true;
            this.updatedTeams++;
          }
          else if (res == 2)
          {
            this.updateTeam = true;
            this.newTeam = true;
            this.notFound = true;
            this.notRanked = false;
            this.badMap = true;
            this.lowRank = true;
          }
          else if (res == 3)
          {
            this.updateTeam = true;
            this.newTeam = true;
            this.notFound = true;
            this.badMap = false;
            this.notRanked = true;
            this.lowRank = true;
          }
          else if (res == 4)
          {
            this.updateTeam = true;
            this.newTeam = true;
            this.notFound = true;
            this.badMap = true;
            this.notRanked = true;
            this.lowRank = false;
          }
          else if (res == 404)
          {
            this.updateTeam = true;
            this.newTeam = true;
            this.notFound = false;
            this.notRanked = true;
            this.badMap = true;
            this.lowRank = true;
          }
          this.loading = false;
          
        });
        this.generalData.currentMatchId = this.generalData.currentMatchId + 1;
          this.generalDataService.updateGeneralData(this.generalData).subscribe((res: any) => {
          
            console.log("Aaa");
            
          });
        
  }

}
