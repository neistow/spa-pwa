import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoviesManagePage } from './movies-manage.page';

const routes: Routes = [
  {
    path: '',
    component: MoviesManagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoviesManagePageRoutingModule {}
