import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { from, Observable, of } from 'rxjs';
import { Movie } from 'src/app/models/movie';
import { first, switchMapTo } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';

interface CreateMovieModel {
  title: string;
  year: string;
  genres: string[];
  plot: string;
}

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(
    private store: AngularFirestore,
  ) {
  }

  public getMovies(limit: number, after?: string): Observable<Movie[]> {
    return this.store.collection<Movie>('movies', ref => {
      const query = ref.orderBy('title').limit(limit);
      return after ? query.startAfter(after) : query;
    }).valueChanges({ idField: 'id' })
      .pipe(first());
  }

  public createMovie(model: CreateMovieModel): Observable<void> {
    return from(
      this.store.collection<Movie>('movies').add({
        id: this.store.createId(),
        ...model
      })
    ).pipe(
      switchMapTo(of())
    );
  }
}
