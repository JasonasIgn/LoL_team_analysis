import { Component, OnInit } from '@angular/core';
import { GeneralData } from '../../models/generaldata.model';
import { Observable, BehaviorSubject } from 'rxjs/';
import { GeneralDataService } from '../../services/general.service';

@Component({
  selector: 'app-collect-data',
  templateUrl: './collect-data.component.html',
  styleUrls: ['./collect-data.component.css']
})
export class CollectDataComponent implements OnInit {

  constructor(private generalDataService: GeneralDataService) { }
  generalData: GeneralData = new GeneralData;
  
  ngOnInit() {

    this.generalDataService.getGeneralData(1).subscribe((response: GeneralData) => {
      this.generalData = response;
    });

  }
}
