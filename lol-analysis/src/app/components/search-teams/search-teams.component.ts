import { Component, OnInit } from '@angular/core';
import { ChampionService } from '../../services/champion.service';
import { ChampionModel } from '../../models/champion.model';
import { MatchModel } from '../../models/match.model';
import { MatchService } from '../../services/match.service';

@Component({
  selector: 'app-search-teams',
  templateUrl: './search-teams.component.html',
  styleUrls: ['./search-teams.component.css']
})
export class SearchTeamsComponent implements OnInit {

  championList: ChampionModel[];
  searchChampions: ChampionModel[] = new Array<ChampionModel>(10);
  selected: number = -1;
  teamValid: boolean = true;
  teamCode1:string = "";
  teamCode2:string = "";
  teamIds1: number[] = new Array<number>(5);
  teamIds2: number[] = new Array<number>(5);
  matchdata: MatchModel = new MatchModel();
  team1Winrate: number = 0;
  team2Winrate: number = 0;
  temp: number = 0;
  constructor(private championService: ChampionService, private matchService: MatchService) { }

  ngOnInit() {
    this.matchdata.team1Wins = 0;
    this.matchdata.team2Wins = 0;
    for (var i = 0; i < 10; i++)
    {
      this.searchChampions[i] = new ChampionModel();
        this.searchChampions[i].id = -1;
        this.searchChampions[i].title = "not selected";
        this.searchChampions[i].name = "not selected";
        this.searchChampions[i].key = "not selected";
    }
      this.championService.getAllChampions().subscribe((data: ChampionModel[]) =>{
        this.championList = data;
      });
  }
  
  setSelected(nr: number)
  {
    this.selected = nr;
    console.log(this.selected);
  }
  pickChampion(id:number)
  {
    if (this.selected != -1)
    {
      for (var i = 0; i < this.championList.length; i++)
      {
        if (this.championList[i].id == id)
        {
          this.searchChampions[this.selected] = this.championList[i];
        }
        
      }
      this.selected++;
    }
  }

  search()
  {
    console.log("a");
    this.teamValid = true;
    for (var i = 0; i < this.searchChampions.length; i++)
    {
      if (this.searchChampions[i].id == -1) this.teamValid = false;
      else 
      {
        if (i < 5) this.teamIds1[i] = this.searchChampions[i].id;
        else this.teamIds2[i - 5] = this.searchChampions[i].id;
      }
    }
    if (this.teamValid)
    {
      console.log("b");
      this.teamIds1.sort();
      this.teamIds2.sort();
      this.teamCode1 = this.teamIds1[0] + '_' + this.teamIds1[1] + '_' + this.teamIds1[2] + '_' + this.teamIds1[3] + '_' + this.teamIds1[4];
      this.teamCode2 = this.teamIds2[0] + '_' + this.teamIds2[1] + '_' + this.teamIds2[2] + '_' + this.teamIds2[3] + '_' + this.teamIds2[4];
      //this.teamCode1 = "19_51_62_238_432";
      //this.teamCode2 = "22_45_86_141_201";
        console.log(this.teamCode1);
        this.matchService.getMatch(this.teamCode1, this.teamCode2).subscribe((data: MatchModel) =>{
          
          this.matchdata = data;
          if (data.teamCode.indexOf(this.teamCode1) != -1 && data.teamCode.indexOf(this.teamCode1) != 0)
          {
            this.temp = data.team1Wins;
            this.matchdata.team1Wins = data.team2Wins;
            this.matchdata.team2Wins = this.temp;
          }
          this.team1Winrate = (this.matchdata.team1Wins / (this.matchdata.team1Wins + this.matchdata.team2Wins)) * 100;
          this.team2Winrate = (this.matchdata.team2Wins / (this.matchdata.team2Wins + this.matchdata.team1Wins)) * 100;
          document.getElementById('team1').style.width = this.team1Winrate + '%';
          document.getElementById('team2').style.width = this.team2Winrate + '%';
          console.log(data);
        });
    }
  }

  message()
  {
    console.log("works");
  
  }
}
