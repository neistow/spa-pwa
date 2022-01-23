import { Component, OnInit, ViewChild } from '@angular/core';
import { concat, Observable, ReplaySubject, Subject } from 'rxjs';
import { Movie } from 'src/app/models/movie';
import { MovieService } from 'src/app/services/movie.service';
import { IonInfiniteScroll } from '@ionic/angular';
import { finalize, map, scan, switchMap, takeWhile, tap, withLatestFrom } from 'rxjs/operators';

interface MovieListModel {
  id: string;
  title: string;
  year: string;
  genres: string;
  plot: string;
  poster: string;
}

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {

  @ViewChild(IonInfiniteScroll)
  public infiniteScroll: IonInfiniteScroll;

  public movies$: Observable<MovieListModel[]>;
  public moviesSkeleton = new Array(6);

  private cursor$ = new ReplaySubject<string>(1);
  private fetchNext$ = new Subject<void>();

  constructor(
    private movieService: MovieService
  ) {
  }

  public ngOnInit(): void {
    const initial = this.movieService.getMovies(25);
    const infScroll = this.fetchNext$.pipe(
      withLatestFrom(this.cursor$),
      switchMap(([_, cursor]) => this.movieService.getMovies(10, cursor)),
    );

    this.movies$ = concat(initial, infScroll).pipe(
      tap(result => this.updateCursor(result)),
      tap(_ => this.infiniteScroll.complete()),
      takeWhile(r => r.length !== 0),
      finalize(() => this.infiniteScroll.disabled = true),
      map(r => r.map(this.mapToListModel)),
      scan((previous, next) => [...previous, ...next])
    );
  }

  public fetchMovies(): void {
    this.fetchNext$.next();
  }

  private updateCursor(movies: Movie[]): void {
    const last = movies[movies.length - 1];
    if (last != null) {
      this.cursor$.next(last.title);
    }
  }

  private mapToListModel(movie: Movie): MovieListModel {
    return {
      id: movie.id,
      title: movie.title,
      year: movie.year,
      plot: movie.plot,
      genres: movie.genres.join(', '),
      poster: `https://picsum.photos/300?blur=2&random=${movie.id}`
    };
  }
}
