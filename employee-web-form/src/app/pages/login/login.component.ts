import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() { return this.form.controls; }

  async onSubmit() {
    this.submitted = true;

    if (this.form.invalid) return;

    this.loading = true;

    await this.authService
      .signIn(this.f['email'].value, this.f['password'].value)
      .then((user) => {
        user ?
          this.router.navigateByUrl('/home') :
          this.loading = false;
      })
      .catch((error) => {
        alert(error.message)
        this.loading = false;
      });
  }
}
