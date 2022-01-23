import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthorizedOnlyGuard } from 'src/app/guards/authorized-only.guard';
import { GuestOnlyGuard } from 'src/app/guards/guest-only.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'movies',
    pathMatch: 'full'
  },
  {
    path: 'movies',
    loadChildren: () => import('./movies/movies.module').then(m => m.MoviesPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule),
    canLoad: [GuestOnlyGuard],
    canActivateChild: [GuestOnlyGuard],
  },
  {
    path: 'manage',
    loadChildren: () => import('./movies-manage/movies-manage.module').then(m => m.MoviesManagePageModule),
    // canLoad: [AuthorizedOnlyGuard],
    // canActivateChild: [AuthorizedOnlyGuard],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
