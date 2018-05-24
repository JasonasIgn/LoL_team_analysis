import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CollectDataComponent } from '../collect-data/collect-data.component';
import { AppComponent } from '../../app.component';

@NgModule({
  imports: [
      RouterModule.forRoot([
          //{ path: '' , component: AppComponent},
          { path: 'collect-data' , component: CollectDataComponent},
          // otherwise redirect to home
          { path: '**', redirectTo: '' }
      ])
  ],
  exports: [
      RouterModule
  ]
})
export class AppRoutingModule {}
