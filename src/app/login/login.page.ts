import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { from, Subject } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnDestroy {

  public form = this.fb.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required]]
  });

  private unsubscribe = new Subject<void>();

  constructor(
    private auth: AngularFireAuth,
    private toast: ToastController,
    private fb: FormBuilder,
    private router: Router,
  ) {
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

    const model = this.form.value;
    from(this.auth.signInWithEmailAndPassword(model.email, model.password))
      .pipe(
        takeUntil(this.unsubscribe)
      )
      .subscribe(
        () => this.handleLoginSuccess(),
        () => this.handleLoginFail()
      );
  }

  private async handleLoginSuccess(): Promise<void> {
    this.form.reset();
    await this.router.navigate(['/']);
  }

  private async handleLoginFail(): Promise<void> {
    const toast = await this.toast.create({
      color: 'danger',
      duration: 2000,
      message: 'Invalid username or password',
    });
    await toast.present();
  }

}
