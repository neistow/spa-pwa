import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  private readonly apiUrl = environment.apiUrl;

  constructor(
    private client: HttpClient
  ) {
  }

  public getGenres(): Observable<string[]> {
    return this.client.get<string[]>(`${this.apiUrl}/genres`);
  }
}
