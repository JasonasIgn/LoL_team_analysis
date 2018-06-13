import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CollectDataComponent } from '../collect-data/collect-data.component';
import { AppComponent } from '../../app.component';
import { CounterComponent } from '../counter/counter.component';
import { AdminComponent } from '../admin/admin.component';
import { SynergyComponent } from '../synergy/synergy.component';

@NgModule({
  imports: [
      RouterModule.forRoot([
          { path: 'admin' , component: AdminComponent},
          { path: 'collect-data' , component: CollectDataComponent},
          { path: 'counter' , component: CounterComponent},
          { path: 'synergy' , component: SynergyComponent},
          // otherwise redirect to home
          { path: '**', redirectTo: '' }
      ])
  ],
  exports: [
      RouterModule
  ]
})
export class AppRoutingModule {}
