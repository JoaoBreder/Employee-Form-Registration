import { Injectable } from '@angular/core';
import { Funcionario } from 'src/app/shared/models/funcionario';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  private uid: string;

  constructor(
    private angularFirestore: AngularFirestore,
    private authService: AuthService
  ) {
    this.uid = authService.currentUser?.uid ?? '';
  }

  async saveFuncionario(funcionario: Funcionario) {
    return new Promise<any>((resolve, reject) => {
      this.angularFirestore
        .collection('funcionarios')
        .add(funcionario);
    });
  }

  async getFuncionarios() {
    return new Promise<any>((resolve, reject) => {
      this.angularFirestore
        .collection('funcionarios', ref => ref.where('uid', '==', this.uid))
        .valueChanges({ idField: 'id' })
        .subscribe(funcionarios => resolve(funcionarios));
    });
  }
}
