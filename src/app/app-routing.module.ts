import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard } from '@angular/fire/compat/auth-guard';
import { canActivate } from '@angular/fire/auth-guard';
import { map } from 'rxjs/operators';

const guestOnly = () => map(user => user == null);

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
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: guestOnly
    }
  },
  {
    path: 'manage',
    loadChildren: () => import('./movies-manage/movies-manage.module').then(m => m.MoviesManagePageModule),
    canActivate: [AngularFireAuthGuard],
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
