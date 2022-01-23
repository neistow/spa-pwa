import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnDestroy {

  public form = this.fb.group({
    username: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(64)]],
    password: [null, [Validators.required]]
  });

  private unsubscribe = new Subject<void>();

  constructor(
    private userService: UserService,
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
    this.userService.login(model.username, model.password)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(result => result ? this.handleLoginSuccess() : this.handleLoginFail());
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
