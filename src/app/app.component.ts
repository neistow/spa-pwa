import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat';

enum LinkPermission {
  guest,
  authorized,
  all
}

interface MenuLink {
  title: string;
  url: string;
  icon: string;
  permission: LinkPermission;
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  public menuLinks$: Observable<MenuLink[]>;

  private menuLinks: MenuLink[] = [
    { title: 'Movies', url: '/movies', icon: 'film', permission: LinkPermission.all },
    { title: 'Login', url: '/login', icon: 'log-in', permission: LinkPermission.guest },
    { title: 'Manage', url: '/manage', icon: 'create', permission: LinkPermission.authorized },
  ];

  constructor(
    public auth: AngularFireAuth,
    private router: Router
  ) {
    this.menuLinks$ = this.auth.user.pipe(
      map(user => this.getUserMenuLinks(user))
    );
  }

  public async logout(): Promise<void> {
    await this.auth.signOut();
    await this.router.navigate(['/']);
  }

  private getUserMenuLinks(user: firebase.User | null): MenuLink[] {
    const userPermission = user === null ? LinkPermission.guest : LinkPermission.authorized;
    return this.menuLinks.filter(l => l.permission === LinkPermission.all || l.permission === userPermission);
  }
}
