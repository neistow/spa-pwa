import { Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, concat, Observable, Subject } from 'rxjs';
import { Movie } from 'src/app/models/movie';
import { MovieService } from 'src/app/services/movie.service';
import { IonInfiniteScroll } from '@ionic/angular';
import { finalize, map, scan, switchMap, takeWhile, tap, withLatestFrom } from 'rxjs/operators';

interface MovieListModel {
  id: number;
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

  private page$ = new BehaviorSubject<number>(1);
  private fetchNext$ = new Subject<void>();

  constructor(
    private movieService: MovieService
  ) {
  }

  public ngOnInit(): void {
    const initial = this.movieService.getMovies(1, 25);
    const infScroll = this.fetchNext$.pipe(
      withLatestFrom(this.page$),
      switchMap(([_, page]) => this.movieService.getMovies(page, 10)),
    );

    this.movies$ = concat(initial, infScroll).pipe(
      tap(r => this.page$.next(r.page + 1)),
      tap(_ => this.infiniteScroll.complete()),
      takeWhile(r => r.totalPages !== this.page$.value, true),
      finalize(() => this.infiniteScroll.disabled = true),
      map(r => r.data.map(this.mapToListModel)),
      scan((previous, next) => [...previous, ...next])
    );
  }

  public fetchMovies(): void {
    this.fetchNext$.next();
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
