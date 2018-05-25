import { Component, OnInit } from '@angular/core';
import { ChampionService } from '../../services/champion.service';
import { ChampionModel } from '../../models/champion.model';

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
  constructor(private championService: ChampionService) { }

  ngOnInit() {
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
      this.teamIds1.sort();
      this.teamIds2.sort();
      this.teamCode1 = this.teamIds1[0] + '_' + this.teamIds1[1] + '_' + this.teamIds1[2] + '_' + this.teamIds1[3] + '_' + this.teamIds1[4];
      this.teamCode2 = this.teamIds2[0] + '_' + this.teamIds2[1] + '_' + this.teamIds2[2] + '_' + this.teamIds2[3] + '_' + this.teamIds2[4];
        console.log(this.teamCode1);
        
    }
  }
}
