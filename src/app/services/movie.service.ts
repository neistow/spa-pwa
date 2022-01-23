import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Movie } from 'src/app/models/movie';
import { map } from 'rxjs/operators';
import { PagedList } from 'src/app/models/pagedList';

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

  private readonly apiUrl = environment.apiUrl;

  constructor(
    private client: HttpClient
  ) {
  }

  public getMovies(page: number, pageSize: number): Observable<PagedList<Movie>> {
    return this.client.get<Movie[]>(`${this.apiUrl}/movies`, {
      params: new HttpParams()
        .set('_start', (page - 1) * pageSize)
        .set('_limit', pageSize),
      observe: 'response'
    }).pipe(
      map(r => ({
        data: r.body,
        page,
        pageSize,
        totalPages: Math.ceil(Number(r.headers.get('x-total-count')) / pageSize)
      }))
    );
  }

  public createMovie(model: CreateMovieModel): Observable<void> {
    return this.client.post<void>(`${this.apiUrl}/movies`, model);
  }
}
