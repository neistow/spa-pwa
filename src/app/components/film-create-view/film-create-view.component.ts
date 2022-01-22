import { Component, OnDestroy } from '@angular/core';
import { FilmService } from 'src/app/services';
import { FilmModel } from 'src/app/models';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-film-create-view',
  templateUrl: './film-create-view.component.html',
  styleUrls: ['./film-create-view.component.css']
})
export class FilmCreateViewComponent implements OnDestroy {

  private unsubscribe = new Subject<void>();

  constructor(
    private filmService: FilmService,
    private router: Router
  ) {
  }

  public ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  public onSubmit(film: FilmModel): void {
    this.filmService.createFilm(film.title, film.year, film.rating)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => this.router.navigate(['/']));
  }
}
