import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { CollectDataComponent } from './components/collect-data/collect-data.component';
import { AppRoutingModule } from './components/shared/app.routing';
import { GeneralDataService } from './services/general.service';
import { HttpModule } from '@angular/http';
import { MatchService } from './services/match.service';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CollectDataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule
  ],
  providers: [
    GeneralDataService, 
    MatchService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
