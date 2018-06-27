import { Component } from '@angular/core';
import { ChampionService } from './services/champion.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'LoL Picker';

  constructor() { }
  
}
