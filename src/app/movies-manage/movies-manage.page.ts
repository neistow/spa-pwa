import { Component, OnDestroy } from '@angular/core';
import { catchError, finalize, takeUntil } from 'rxjs/operators';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { GenreService } from 'src/app/services/genre.service';
import { MovieService } from 'src/app/services/movie.service';
import { Genre } from 'src/app/models/genre';

@Component({
  selector: 'app-movies-manage',
  templateUrl: './movies-manage.page.html',
  styleUrls: ['./movies-manage.page.scss'],
})
export class MoviesManagePage implements OnDestroy {

  public readonly currentYear = (new Date()).getFullYear();

  public form = this.fb.group({
    title: [null, [Validators.required, Validators.maxLength(128)]],
    year: [null, [Validators.required, Validators.min(1895), Validators.max(this.currentYear)]],
    genres: [null, [Validators.required]],
    plot: [null, [Validators.required]]
  });

  public loading$: Observable<boolean>;
  public genres$: Observable<Genre[]>;
  public years: number[];

  private loading = new BehaviorSubject(false);
  private unsubscribe = new Subject<void>();

  constructor(
    private movieService: MovieService,
    private genreService: GenreService,
    private toast: ToastController,
    private fb: FormBuilder,
  ) {
    this.genres$ = this.genreService.getGenres();
    this.loading$ = this.loading.asObservable();

    this.years = this.generateYears();
  }

  public ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  public onSubmit(): void {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.next(true);

    this.movieService.createMovie(this.form.value)
      .pipe(
        takeUntil(this.unsubscribe),
        catchError(() => this.handleCreateFail()),
        finalize(() => this.loading.next(false))
      )
      .subscribe(() => {
        this.form.reset();
        this.handleCreateSuccess();
      });
  }

  private async handleCreateSuccess(): Promise<void> {
    const toast = await this.toast.create({
      color: 'success',
      duration: 2000,
      message: 'Movie added!',
    });
    await toast.present();
  }

  private async handleCreateFail(): Promise<void> {
    const toast = await this.toast.create({
      color: 'danger',
      duration: 2000,
      message: 'Failed to add a movie!',
    });
    await toast.present();
  }

  private generateYears(): number[] {
    const startYear = 1895;
    return Array.from({ length: this.currentYear - startYear + 1 }, (_, i) => this.currentYear - i);
  }
}
