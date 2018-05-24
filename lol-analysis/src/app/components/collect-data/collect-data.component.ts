import { Component, OnInit } from '@angular/core';
import { GeneralData } from '../../models/generaldata.model';

@Component({
  selector: 'app-collect-data',
  templateUrl: './collect-data.component.html',
  styleUrls: ['./collect-data.component.css']
})
export class CollectDataComponent implements OnInit {

  constructor() { }
  data: GeneralData = new GeneralData;
  
  ngOnInit() {
    this.data.id = 1;
    this.data.currentMatchId = 3639741266;
    this.data.totalTeamCombinations = 1;
  }

}
