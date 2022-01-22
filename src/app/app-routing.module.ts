import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilmCreateViewComponent, FilmListViewComponent } from './components';

const routes: Routes = [
  { path: '', component: FilmListViewComponent },
  { path: 'create', component: FilmCreateViewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
