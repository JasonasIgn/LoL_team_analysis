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

  constructor(private championService: ChampionService) { }

  ngOnInit() {
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
}
