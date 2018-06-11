import { Component, OnInit } from '@angular/core';
import { ChampionService } from '../../services/champion.service';
import { ChampionModel } from '../../models/champion.model';
import { MatchModel } from '../../models/match.model';
import { MatchService } from '../../services/match.service';
import { SuggestionModel } from '../../models/suggestion.model';

@Component({
  selector: 'app-search-teams',
  templateUrl: './search-teams.component.html',
  styleUrls: ['./search-teams.component.css']
})
export class SearchTeamsComponent implements OnInit {

  MAXIND: number = 555;
  MAXCHAMPS: number = 141;
  teamUniqueCode1: number = 0;
  teamUniqueCode2: number = 0;
  championList: ChampionModel[];
  searchChampions: ChampionModel[] = new Array<ChampionModel>(10);
  searchChampionsPositions: string[] = new Array<string>(10);
  selected: number = -1;
  teamValid: boolean = true;
  teamCode1:string = "";
  teamCode2:string = "";
  teamIds1: number[] = new Array<number>(5);
  teamIds2: number[] = new Array<number>(5);
  suggestion0: SuggestionModel[] = new Array<SuggestionModel>();
  suggestion1: SuggestionModel[] = new Array<SuggestionModel>();
  suggestion2: SuggestionModel[] = new Array<SuggestionModel>();
  suggestion3: SuggestionModel[] = new Array<SuggestionModel>();
  suggestion4: SuggestionModel[] = new Array<SuggestionModel>();
  suggestion5: SuggestionModel[] = new Array<SuggestionModel>();
  suggestion6: SuggestionModel[] = new Array<SuggestionModel>();
  suggestion7: SuggestionModel[] = new Array<SuggestionModel>();
  suggestion8: SuggestionModel[] = new Array<SuggestionModel>();
  suggestion9: SuggestionModel[] = new Array<SuggestionModel>();
  suggestionModel: SuggestionModel = new SuggestionModel();
  win:number;
  champId: number;
  loss: number;
  indexPosition: number;
  status:number;
  stringForConvert: string;
  matchdata: MatchModel = new MatchModel();
  team1Winrate: number = 0;
  team2Winrate: number = 0;
  temp: number = 0;
  tempString: string;
  searchInput: string = "";
  constructor(private championService: ChampionService, private matchService: MatchService) { }

  ngOnInit() {
    this.matchdata.team1Wins = 0;
    this.matchdata.team2Wins = 0;
    this.searchChampionsPositions[0] = "TOP";
    this.searchChampionsPositions[1] = "JUNGLE";
    this.searchChampionsPositions[2] = "MIDDLE";
    this.searchChampionsPositions[3] = "ADC";
    this.searchChampionsPositions[4] = "SUPPORT";
    this.searchChampionsPositions[5] = "TOP";
    this.searchChampionsPositions[6] = "JUNGLE";
    this.searchChampionsPositions[7] = "MIDDLE";
    this.searchChampionsPositions[8] = "ADC";
    this.searchChampionsPositions[9] = "SUPPORT";
    
    for (var i = 0; i < 10; i++)
    {
      this.searchChampions[i] = new ChampionModel();
        this.searchChampions[i].id = 0;
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
      this.suggestion0 = new Array<SuggestionModel>();
      this.suggestion1 = new Array<SuggestionModel>();
      this.suggestion2 = new Array<SuggestionModel>();
      this.suggestion3 = new Array<SuggestionModel>();
      this.suggestion4 = new Array<SuggestionModel>();
      this.suggestion5 = new Array<SuggestionModel>();
      this.suggestion6 = new Array<SuggestionModel>();
      this.suggestion7 = new Array<SuggestionModel>();
      this.suggestion8 = new Array<SuggestionModel>();
      this.suggestion9 = new Array<SuggestionModel>();
      
      console.log("b");
      //this.teamIds1.sort();
      //this.teamIds2.sort();
      this.teamUniqueCode1 = 0;
      this.teamUniqueCode2 = 0;
      this.teamCode1 = this.teamIds1[0] + '_' + this.teamIds1[1] + '_' + this.teamIds1[2] + '_' + this.teamIds1[3] + '_' + this.teamIds1[4];
      this.teamCode2 = this.teamIds2[0] + '_' + this.teamIds2[1] + '_' + this.teamIds2[2] + '_' + this.teamIds2[3] + '_' + this.teamIds2[4];
      if (this.teamIds1[0] != 0)
      {
          this.teamUniqueCode1 += this.teamIds1[0];
          this.teamUniqueCode2 += this.teamIds1[0] + this.MAXIND * 31;
      }
      if (this.teamIds1[1] != 0)
      {
        this.teamUniqueCode1 += this.teamIds1[1] + this.MAXIND * 1;
        this.teamUniqueCode2 += this.teamIds1[1] + this.MAXIND * 63;
      }
      if (this.teamIds1[2] != 0)
      {
        this.teamUniqueCode1 += this.teamIds1[2] + this.MAXIND * 3;
        this.teamUniqueCode2 += this.teamIds1[2] + this.MAXIND * 127;
      }
      if (this.teamIds1[3] != 0)
      {
        this.teamUniqueCode1 += this.teamIds1[3] + this.MAXIND * 7;
        this.teamUniqueCode2 += this.teamIds1[3] + this.MAXIND * 255;
      }
      if (this.teamIds1[4] != 0)
      {
        this.teamUniqueCode1 += this.teamIds1[4] + this.MAXIND * 15;
        this.teamUniqueCode2 += this.teamIds1[4] + this.MAXIND * 511;
      }
      if (this.teamIds2[0] != 0)
      {
        this.teamUniqueCode1 += this.teamIds2[0] + this.MAXIND * 31;
        this.teamUniqueCode2 += this.teamIds2[0];
      }
      if (this.teamIds2[1] != 0)
      {
        this.teamUniqueCode1 += this.teamIds2[1] + this.MAXIND * 63;
        this.teamUniqueCode2 += this.teamIds2[1] + this.MAXIND * 1;
      }
      if (this.teamIds2[2] != 0)
      {
        this.teamUniqueCode1 += this.teamIds2[2] + this.MAXIND * 127;
        this.teamUniqueCode2 += this.teamIds2[2] + this.MAXIND * 3;
      }
      if (this.teamIds2[3] != 0)
      {
        this.teamUniqueCode1 += this.teamIds2[3] + this.MAXIND * 255;
        this.teamUniqueCode2 += this.teamIds2[3] + this.MAXIND * 7;
      }
      if (this.teamIds2[4] != 0)
      {
        this.teamUniqueCode1 += this.teamIds2[4] + this.MAXIND * 511;
        this.teamUniqueCode2 += this.teamIds2[4] + this.MAXIND * 15;
      }
      //this.teamCode1 = "19_51_62_238_432";
      //this.teamCode2 = "22_45_86_141_201";
        console.log(this.teamCode1 + '-' + this.teamCode2);
        this.matchService.getMatch(this.teamCode1, this.teamCode2).subscribe((data: MatchModel) =>{
          
          this.matchdata = data;
          console.log(data);
          console.log(this.teamUniqueCode1);
          console.log(this.teamUniqueCode2);
          
          if (data.id == this.teamUniqueCode2)
          {
            console.log("KEICIAMOS");
            //Apkeiciamos reiksmes
            this.temp = data.team1Wins;
            this.matchdata.team1Wins = data.team2Wins;
            this.matchdata.team2Wins = this.temp;

            this.tempString = data.suggestion0;
            this.matchdata.suggestion0 = data.suggestion5;
            this.matchdata.suggestion5 = this.tempString;

            this.tempString = data.suggestion1;
            this.matchdata.suggestion1 = data.suggestion6;
            this.matchdata.suggestion6 = this.tempString;

            this.tempString = data.suggestion2;
            this.matchdata.suggestion2 = data.suggestion7;
            this.matchdata.suggestion7 = this.tempString;

            this.tempString = data.suggestion3;
            this.matchdata.suggestion3 = data.suggestion8;
            this.matchdata.suggestion8 = this.tempString;

            this.tempString = data.suggestion4;
            this.matchdata.suggestion4 = data.suggestion9;
            this.matchdata.suggestion9 = this.tempString;
          } 

          this.GetSuggestionInfo(this.matchdata.suggestion0, this.suggestion0);
          this.GetSuggestionInfo(this.matchdata.suggestion1, this.suggestion1);
          this.GetSuggestionInfo(this.matchdata.suggestion2, this.suggestion2);
          this.GetSuggestionInfo(this.matchdata.suggestion3, this.suggestion3);
          this.GetSuggestionInfo(this.matchdata.suggestion4, this.suggestion4);
          this.GetSuggestionInfo(this.matchdata.suggestion5, this.suggestion5);
          this.GetSuggestionInfo(this.matchdata.suggestion6, this.suggestion6);
          this.GetSuggestionInfo(this.matchdata.suggestion7, this.suggestion7);
          this.GetSuggestionInfo(this.matchdata.suggestion8, this.suggestion8);
          this.GetSuggestionInfo(this.matchdata.suggestion9, this.suggestion9);

           
          this.suggestion0.sort((a, b) => a.Win > b.Win ? -1 : a.Win < b.Win ? 1 : 0);
          this.suggestion1.sort((a, b) => a.Win > b.Win ? -1 : a.Win < b.Win ? 1 : 0);
          this.suggestion2.sort((a, b) => a.Win > b.Win ? -1 : a.Win < b.Win ? 1 : 0);
          this.suggestion3.sort((a, b) => a.Win > b.Win ? -1 : a.Win < b.Win ? 1 : 0);
          this.suggestion4.sort((a, b) => a.Win > b.Win ? -1 : a.Win < b.Win ? 1 : 0);
          this.suggestion5.sort((a, b) => a.Win > b.Win ? -1 : a.Win < b.Win ? 1 : 0);
          this.suggestion6.sort((a, b) => a.Win > b.Win ? -1 : a.Win < b.Win ? 1 : 0);
          this.suggestion7.sort((a, b) => a.Win > b.Win ? -1 : a.Win < b.Win ? 1 : 0);
          this.suggestion8.sort((a, b) => a.Win > b.Win ? -1 : a.Win < b.Win ? 1 : 0);
          this.suggestion9.sort((a, b) => a.Win > b.Win ? -1 : a.Win < b.Win ? 1 : 0);
          //console.log(this.suggestion1[0].Win + "CHAAAMP");
          //if (data.teamCode.indexOf(this.teamCode1) != -1 && data.teamCode.indexOf(this.teamCode1) != 0)
          //{
          //  this.temp = data.team1Wins;
          //  this.matchdata.team1Wins = data.team2Wins;
          //  this.matchdata.team2Wins = this.temp;
          //}
          this.team1Winrate = (this.matchdata.team1Wins / (this.matchdata.team1Wins + this.matchdata.team2Wins)) * 100;
          this.team2Winrate = (this.matchdata.team2Wins / (this.matchdata.team2Wins + this.matchdata.team1Wins)) * 100;
          document.getElementById('team1').style.width = this.team1Winrate + '%';
          document.getElementById('team2').style.width = this.team2Winrate + '%';
          console.log(this.matchdata);
        });
    }
  }
  setSearchInput(input:string)
  {
      this.searchInput = input;
  }
  GetSuggestionInfo(input: string, suggestionArray:SuggestionModel[])
  {
    
        this.status = 0;
        this.champId = 0;
        this.stringForConvert = ""; 
        this.indexPosition = 0;
        if (input != null)
        {
          while(this.indexPosition < input.length)
          {
              if ('0123456789'.indexOf(input[this.indexPosition]) !== -1)
              {
                this.stringForConvert += input[this.indexPosition];
                this.indexPosition++;
              }
              else if (input[this.indexPosition] == '(')
              {
                
                  this.status++;
                  this.champId = parseInt(this.stringForConvert, 10); 
                  
                  this.stringForConvert = "";

                  this.indexPosition++;
              }
              else if (input[this.indexPosition] == ',')
              {
                
                  this.status++;
                  this.win = parseInt(this.stringForConvert, 10); 
                  this.stringForConvert = "";

                  this.indexPosition++;
              }
              else if (input[this.indexPosition] == ')')
              {
                
                  this.status = 0;
                  this.loss = parseInt(this.stringForConvert, 10); 
                  this.stringForConvert = "";
                  this.suggestionModel = new SuggestionModel();
                  this.suggestionModel.ChampionId = this.champId;
                  //console.log(this.suggestionModel.ChampionId + "CHAAAMP");
                  if (this.win > this.loss)
                  {
                    this.suggestionModel.Loss = this.loss;
                    this.suggestionModel.Win = this.win;
                    this.suggestionModel.Total = this.win + this.loss;
                    
                    suggestionArray.push(this.suggestionModel);
                  }
                  
                  this.indexPosition++;
              }
          }
        }
        //return suggestionArray;
  }
}
