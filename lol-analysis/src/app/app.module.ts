import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { CollectDataComponent } from './components/collect-data/collect-data.component';
import { AppRoutingModule } from './components/shared/app.routing';
import { GeneralDataService } from './services/general.service';
import { HttpModule } from '@angular/http';
import { MatchService } from './services/match.service';
import { CounterComponent } from './components/counter/counter.component';
import { ChampionService } from './services/champion.service';
import { AdminComponent } from './components/admin/admin.component';
import { ChampionFilterPipe } from './pipes/champion-filter.pipe';
import { ChampionFilterComponent } from './components/counter/champion-filter.component';
import { SynergyComponent } from './components/synergy/synergy.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/shared/footer/footer.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CollectDataComponent,
    CounterComponent,
    AdminComponent,
    ChampionFilterPipe,
    ChampionFilterComponent,
    SynergyComponent,
    HomeComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule
  ],
  providers: [
    GeneralDataService, 
    MatchService,
    ChampionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
