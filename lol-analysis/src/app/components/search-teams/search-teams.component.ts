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
  Load(api: string)
  {
    this.championService.updateChampions(api).subscribe((data: ChampionModel[]) =>{
      console.log("success");
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
}
