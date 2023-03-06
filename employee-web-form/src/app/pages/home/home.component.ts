import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  loading: boolean = false;

  constructor(
    private authService: AuthService
  ) { }

  async logout() {
    this.loading = true;
    setTimeout(async () => {
      this.loading = true;
      await this.authService.signOut();
    }, 500);
  }
}
