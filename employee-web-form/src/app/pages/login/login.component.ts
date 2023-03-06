import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  errMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private notification: NzNotificationService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() { return this.form.controls; }

  async onSubmit() {
    if (this.form.invalid) {
      this.errMessage = 'Informe seu Email e sua Senha.';
      this.sendNotification();
      return;
    }

    this.loading = true;

    await this.authService
      .signIn(this.f['email'].value, this.f['password'].value)
      .then((user) => {
        user ?
          this.router.navigateByUrl('/home') :
          this.loading = false;
      })
      .catch((error) => {
        if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-email' || error.code === 'auth/user-disabled') {
          this.errMessage = 'Senha ou email incorretos. Verifique.';
        }

        if (error.code === 'auth/too-many-requests') {
          this.errMessage = 'Você excedeu o número de tentativas de login. Por favor, tente novamente mais tarde.';
        }

        this.loading = false;
        this.sendNotification();
      });
  }

  private sendNotification(): void {
    this.notification.error('Erro na Autenticação', this.errMessage);
  }
}
