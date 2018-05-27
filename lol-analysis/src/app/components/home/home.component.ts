import { Component, OnInit } from '@angular/core';
import { ChampionService } from '../../services/champion.service';
import { ChampionModel } from '../../models/champion.model';
import { GeneralDataService } from '../../services/general.service';
import { GeneralData } from '../../models/generaldata.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  api: string = "";
  loading: boolean = false;
  generalData: GeneralData = new GeneralData();

  constructor(private championService: ChampionService, private generalDataService: GeneralDataService) { }
  

  ngOnInit() {

    this.generalDataService.getGeneralData(1).subscribe((response: GeneralData) => {
      this.generalData = response;
    });

  }

  UpdateApi(api: string)
  {
    this.generalData.apiKey = api;
    this.generalDataService.updateGeneralData(this.generalData).subscribe((res: any) => { 
      console.log("Aaa");
    });
  }

  UpdateChampions()
  {
    this.championService.updateChampions(this.api).subscribe((data: ChampionModel[]) =>{
      console.log("success");
    });
  }

 

}
