import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MoviesManagePageRoutingModule } from './movies-manage-routing.module';

import { MoviesManagePage } from './movies-manage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MoviesManagePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [MoviesManagePage]
})
export class MoviesManagePageModule {
}
