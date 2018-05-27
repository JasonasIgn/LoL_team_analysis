import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CollectDataComponent } from '../collect-data/collect-data.component';
import { AppComponent } from '../../app.component';
import { SearchTeamsComponent } from '../search-teams/search-teams.component';
import { HomeComponent } from '../home/home.component';

@NgModule({
  imports: [
      RouterModule.forRoot([
          { path: 'home' , component: HomeComponent},
          { path: 'collect-data' , component: CollectDataComponent},
          { path: 'search-teams' , component: SearchTeamsComponent},
          // otherwise redirect to home
          { path: '**', redirectTo: '' }
      ])
  ],
  exports: [
      RouterModule
  ]
})
export class AppRoutingModule {}
