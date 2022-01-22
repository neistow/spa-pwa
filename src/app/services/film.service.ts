import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { FilmModel } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class FilmService {

  private readonly apiUrl: string = environment.apiUrl;

  constructor(private client: HttpClient) {
  }

  public getFilms(): Observable<FilmModel[]> {
    return this.client.get<FilmModel[]>(`${this.apiUrl}/films`);
  }

  public createFilm(title: string, year: number, rating: number): Observable<FilmModel> {
    return this.client.post<FilmModel>(`${this.apiUrl}/films`, { title, year, rating });
  }

  public updateFilm(film: FilmModel): Observable<FilmModel>{
    return this.client.put<FilmModel>(`${this.apiUrl}/films/${film.id}`, film);
  }

  public deleteFilm(id: number): Observable<void> {
    return this.client.delete<void>(`${this.apiUrl}/films/${id}`);
  }
}
