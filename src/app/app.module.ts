import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatInputModule} from '@angular/material/input';
import {MatGridListModule} from '@angular/material/grid-list';
import {NgForm} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { InputtaskComponent } from './inputtask/inputtask.component';


@NgModule({    //decorators
  declarations: [
    AppComponent,
    InputtaskComponent,
    NgForm
  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatInputModule,
    MatCheckboxModule,
    MatCardModule,
    MatGridListModule,
    ReactiveFormsModule
  ],

  providers: [],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
