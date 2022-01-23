import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Genre } from 'src/app/models/genre';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  constructor(
    private store: AngularFirestore,
  ) {
  }

  public getGenres(): Observable<Genre[]> {
    return this.store.collection<Genre>('genres').valueChanges().pipe(first());
  }
}
