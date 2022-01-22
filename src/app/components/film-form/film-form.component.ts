import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FilmModel } from 'src/app/models';

@Component({
  selector: 'app-film-form',
  templateUrl: './film-form.component.html',
  styleUrls: ['./film-form.component.css']
})
export class FilmFormComponent implements OnInit {

  public form!: FormGroup;

  @Input()
  public model?: FilmModel;

  @Output()
  public formSubmit = new EventEmitter<FilmModel>();

  constructor(private fb: FormBuilder) {
  }

  public ngOnInit(): void {
    const model = this.model;

    this.form = this.fb.group({
      id: [model?.id],
      title: [model?.title, [Validators.required]],
      year: [model?.year, [Validators.required]],
      rating: [model?.rating, [Validators.required]],
    });
  }

  public onSubmit(): void {
    if (!this.form.valid) {
      return;
    }

    this.formSubmit.emit(this.form.value);
  }
}
