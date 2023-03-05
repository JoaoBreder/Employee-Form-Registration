import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user';


@Injectable({ providedIn: 'root' })
export class AuthService {
  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;

  constructor(public angularFire: AngularFireAuth) {
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
    await this.angularFire.signOut();
  }

}
