import { Component } from '@angular/core';
import { FilmService } from 'src/app/services';
import { Observable } from 'rxjs';
import { FilmModel } from 'src/app/models';

@Component({
  selector: 'app-film-list-view',
  templateUrl: './film-list-view.component.html',
  styleUrls: ['./film-list-view.component.css']
})
export class FilmListViewComponent {

  public films$: Observable<FilmModel[]>

  public displayedColumns: ReadonlyArray<string> = [
    'id',
    'title',
    'rating',
    'year',
  ];

  constructor(
    private filmService: FilmService
  ) {
    this.films$ = this.filmService.getFilms();
  }
}
