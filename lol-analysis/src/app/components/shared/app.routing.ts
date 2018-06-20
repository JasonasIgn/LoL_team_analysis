import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CounterComponent } from '../counter/counter.component';
import { SynergyComponent } from '../synergy/synergy.component';
import { HomeComponent } from '../home/home.component';
import { ContactComponent } from '../contact/contact.component';

@NgModule({
  imports: [
      RouterModule.forRoot([
          { path: '' , component: HomeComponent},
          { path: 'counter' , component: CounterComponent},
          { path: 'synergy' , component: SynergyComponent},
          { path: 'contact' , component: ContactComponent},
          // otherwise redirect to home
          { path: '**', redirectTo: '' }
      ])
  ],
  exports: [
      RouterModule
  ]
})
export class AppRoutingModule {}
