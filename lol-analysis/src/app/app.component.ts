import { Component } from '@angular/core';
import { ChampionService } from './services/champion.service';
import { ChampionModel } from './models/champion.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'LoL analysis';
  api: string = "";
  loading: boolean = false;

  constructor(private championService: ChampionService) { }
  
  UpdateApi(api: string)
  {
    //Not implemented
  }

  UpdateChampions()
  {
    this.championService.updateChampions(this.api).subscribe((data: ChampionModel[]) =>{
      console.log("success");
    });
  }
}
