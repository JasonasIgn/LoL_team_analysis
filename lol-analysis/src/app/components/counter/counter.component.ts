import { Component, OnInit } from '@angular/core';
import { ChampionService } from '../../services/champion.service';
import { ChampionModel } from '../../models/champion.model';
import { MatchModel } from '../../models/match.model';
import { MatchService } from '../../services/match.service';
import { SuggestionModel } from '../../models/suggestion.model';


@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit {

  MAXIND: number = 555;
  MAXCHAMPS: number = 141;
  teamUniqueCode1: number = 0;
  teamUniqueCode2: number = 0;
  championList: ChampionModel[];
  championListForDisplay: ChampionModel[] = new Array<ChampionModel>(this.MAXIND);
  searchChampions: ChampionModel[] = new Array<ChampionModel>(5);
  searchChampionsPositions: string[] = new Array<string>(5);
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
  suggestion0Worst: SuggestionModel[] = new Array<SuggestionModel>();
  suggestion1Worst: SuggestionModel[] = new Array<SuggestionModel>();
  suggestion2Worst: SuggestionModel[] = new Array<SuggestionModel>();
  suggestion3Worst: SuggestionModel[] = new Array<SuggestionModel>();
  suggestion4Worst: SuggestionModel[] = new Array<SuggestionModel>();
  suggestion5Worst: SuggestionModel[] = new Array<SuggestionModel>();
  suggestion6Worst: SuggestionModel[] = new Array<SuggestionModel>();
  suggestion7Worst: SuggestionModel[] = new Array<SuggestionModel>();
  suggestion8Worst: SuggestionModel[] = new Array<SuggestionModel>();
  suggestion9Worst: SuggestionModel[] = new Array<SuggestionModel>();
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
    
    for (var i = 0; i < 5; i++)
    {
      this.searchChampions[i] = new ChampionModel();
        this.searchChampions[i].id = -1 + (i * -1);
        this.searchChampions[i].title = "none";
        this.searchChampions[i].name = "none";
        this.searchChampions[i].key = "none";
    }
    this.championService.getAllChampions().subscribe((data: ChampionModel[]) =>{
      this.championList = data;
      for (var i = 0; i < this.MAXCHAMPS; i++)
      {
        this.championListForDisplay[this.championList[i].id] = this.championList[i];
      }
    });

    window.onscroll = function() {
      if (window.pageYOffset >= 187) {
        document.getElementById("inputDiv").classList.add("sticky");
        document.getElementById("lowerContent").classList.add("relative");
        for (let i = 0;i < document.getElementsByClassName("positions").length;i++)
         {
          document.getElementsByClassName("positions")[i].classList.add("display-none");
        }
    } else {
      document.getElementById("inputDiv").classList.remove("sticky");
      document.getElementById("lowerContent").classList.remove("relative");
      for (let i = 0; i < document.getElementsByClassName("positions").length;i++)
        {
          document.getElementsByClassName("positions")[i].classList.remove("display-none");
        }
    }
    };
    
  }
  
  setSelected(nr: number)
  {
    this.selected = nr;
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
      if (this.selected < 4) this.selected++;
    }
  }

  search()
  {
    this.teamValid = true;
    for (var i = 0; i < this.searchChampions.length; i++)
    {

        if (i < 5) this.teamIds1[i] = this.searchChampions[i].id;

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

      this.suggestion0Worst = new Array<SuggestionModel>();
      this.suggestion1Worst = new Array<SuggestionModel>();
      this.suggestion2Worst = new Array<SuggestionModel>();
      this.suggestion3Worst = new Array<SuggestionModel>();
      this.suggestion4Worst = new Array<SuggestionModel>();
      this.suggestion5Worst = new Array<SuggestionModel>();
      this.suggestion6Worst = new Array<SuggestionModel>();
      this.suggestion7Worst = new Array<SuggestionModel>();
      this.suggestion8Worst = new Array<SuggestionModel>();
      this.suggestion9Worst = new Array<SuggestionModel>();
      for (var i = 0; i < 5; i++)
      {
        if (this.teamIds1[i] < 0) this.teamIds1[i] = 0;
      }
      this.teamUniqueCode1 = 0;
      this.teamUniqueCode2 = 0;
      this.teamCode1 = this.teamIds1[0] + '_' + this.teamIds1[1] + '_' + this.teamIds1[2] + '_' + this.teamIds1[3] + '_' + this.teamIds1[4];
      this.teamCode2 = "0_0_0_0_0";
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
        this.matchService.getMatch(this.teamCode1, this.teamCode2).subscribe((data: MatchModel) =>{
          
          this.matchdata = data;
          
          if (data.id == this.teamUniqueCode1)
          {
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

          this.GetSuggestionInfo(this.matchdata.suggestion0, this.suggestion0, this.suggestion0Worst);
          this.GetSuggestionInfo(this.matchdata.suggestion1, this.suggestion1, this.suggestion1Worst);
          this.GetSuggestionInfo(this.matchdata.suggestion2, this.suggestion2, this.suggestion2Worst);
          this.GetSuggestionInfo(this.matchdata.suggestion3, this.suggestion3, this.suggestion3Worst);
          this.GetSuggestionInfo(this.matchdata.suggestion4, this.suggestion4, this.suggestion4Worst);
          this.GetSuggestionInfo(this.matchdata.suggestion5, this.suggestion5, this.suggestion5Worst);
          this.GetSuggestionInfo(this.matchdata.suggestion6, this.suggestion6, this.suggestion6Worst);
          this.GetSuggestionInfo(this.matchdata.suggestion7, this.suggestion7, this.suggestion7Worst);
          this.GetSuggestionInfo(this.matchdata.suggestion8, this.suggestion8, this.suggestion8Worst);
          this.GetSuggestionInfo(this.matchdata.suggestion9, this.suggestion9, this.suggestion9Worst);

           
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

          this.suggestion0Worst.sort((a, b) => a.Loss > b.Loss ? -1 : a.Loss < b.Loss ? 1 : 0);
          this.suggestion1Worst.sort((a, b) => a.Loss > b.Loss ? -1 : a.Loss < b.Loss ? 1 : 0);
          this.suggestion2Worst.sort((a, b) => a.Loss > b.Loss ? -1 : a.Loss < b.Loss ? 1 : 0);
          this.suggestion3Worst.sort((a, b) => a.Loss > b.Loss ? -1 : a.Loss < b.Loss ? 1 : 0);
          this.suggestion4Worst.sort((a, b) => a.Loss > b.Loss ? -1 : a.Loss < b.Loss ? 1 : 0);
          this.suggestion5Worst.sort((a, b) => a.Loss > b.Loss ? -1 : a.Loss < b.Loss ? 1 : 0);
          this.suggestion6Worst.sort((a, b) => a.Loss > b.Loss ? -1 : a.Loss < b.Loss ? 1 : 0);
          this.suggestion7Worst.sort((a, b) => a.Loss > b.Loss ? -1 : a.Loss < b.Loss ? 1 : 0);
          this.suggestion8Worst.sort((a, b) => a.Loss > b.Loss ? -1 : a.Loss < b.Loss ? 1 : 0);
          this.suggestion9Worst.sort((a, b) => a.Loss > b.Loss ? -1 : a.Loss < b.Loss ? 1 : 0);
          
          this.suggestion0 = this.suggestion0.slice(0, 3);
          this.suggestion1 = this.suggestion1.slice(0, 3);
          this.suggestion2 = this.suggestion2.slice(0, 3);
          this.suggestion3 = this.suggestion3.slice(0, 3);
          this.suggestion4 = this.suggestion4.slice(0, 3);
          this.suggestion0Worst = this.suggestion0Worst.slice(0, 3);
          this.suggestion1Worst = this.suggestion1Worst.slice(0, 3);
          this.suggestion2Worst = this.suggestion2Worst.slice(0, 3);
          this.suggestion3Worst = this.suggestion3Worst.slice(0, 3);
          this.suggestion4Worst = this.suggestion4Worst.slice(0, 3);

        });
    }
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

    
    
  setSearchInput(input:string)
  {
      this.searchInput = input;
  }
  deleteSelection(index:number)
  {
    this.searchChampions[index] = new ChampionModel();
    this.searchChampions[index].id = (-1 + (index * -1));
    this.searchChampions[index].title = "none";
    this.searchChampions[index].name = "none";
    this.searchChampions[index].key = "none";
  }
  GetSuggestionInfo(input: string, suggestionArray:SuggestionModel[], suggestionArrayWorst:SuggestionModel[])
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
                  this.suggestionModel.Loss = this.loss;
                  this.suggestionModel.Win = this.win;
                  this.suggestionModel.Total = this.win + this.loss;
                  this.suggestionModel.Winrate = Math.round(this.win / (this.win + this.loss) * 100);
                  if (this.win > this.loss)
                  {
                    
                    suggestionArray.push(this.suggestionModel);
                  }
                  else if (this.loss > this.win)
                  {
                    suggestionArrayWorst.push(this.suggestionModel);
                  }
                  
                  this.indexPosition++;
              }
          }
        }
  }
}
