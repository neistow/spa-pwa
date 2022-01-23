import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ApplicationUser, UserService } from 'src/app/services/user.service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

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
    private userService: UserService,
    private router: Router
  ) {
    this.menuLinks$ = this.userService.user$.pipe(
      map(user => this.getUserMenuLinks(user))
    );
  }

  public logout(): void {
    this.userService.logout();
    this.router.navigate(['/']);
  }

  private getUserMenuLinks(user: ApplicationUser | null): MenuLink[] {
    const userPermission = user === null ? LinkPermission.guest : LinkPermission.authorized;
    return this.menuLinks.filter(l => l.permission === LinkPermission.all || l.permission === userPermission);
  }
}
