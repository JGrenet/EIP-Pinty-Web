import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/* Routing Module */
import { AppRoutingModule } from './app-routing.module';

/* Bootstrap Component */
import { AppComponent } from './app.component';

/* Core Module */
import { CoreModule } from './core/core.module';
import {HeaderModule} from './header/header.module';


@NgModule({
  imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule, CoreModule, HeaderModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})

export class AppModule { }


