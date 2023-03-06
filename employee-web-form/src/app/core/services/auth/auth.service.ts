import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user';
import { Router } from '@angular/router';


@Injectable({ providedIn: 'root' })
export class AuthService {
  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;

  constructor(
    private angularFire: AngularFireAuth,
    private router: Router
  ) {
    this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
    this.user = this.userSubject.asObservable();
  }

  public get currentUser() {
    return this.userSubject.value;
  }

  async signIn(email: string, password: string) {
    const { user } = await this.angularFire.signInWithEmailAndPassword(email, password);

    const item = {
      email: user?.email,
      uid: user?.uid
    }

    localStorage.setItem('user', JSON.stringify(item));
    this.userSubject.next(item);

    return user;
  }

  async signOut() {
    localStorage.clear();
    this.userSubject.next(null);
    await this.angularFire.signOut();
    this.router.navigateByUrl('/login');
  }

}
