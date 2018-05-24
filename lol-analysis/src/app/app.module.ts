import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { CollectDataComponent } from './components/collect-data/collect-data.component';
import { AppRoutingModule } from './components/shared/app.routing';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CollectDataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
