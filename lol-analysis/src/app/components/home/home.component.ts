import { Component, OnInit } from '@angular/core';
import { ChampionService } from '../../services/champion.service';
import { ChampionModel } from '../../models/champion.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  api: string = "";
  loading: boolean = false;

  constructor(private championService: ChampionService) { }
  

  ngOnInit() {
  }

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
