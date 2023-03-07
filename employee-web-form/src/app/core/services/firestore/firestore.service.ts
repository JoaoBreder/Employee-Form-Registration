import { Injectable } from '@angular/core';
import { Funcionario } from 'src/app/shared/models/funcionario';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private angularFirestore: AngularFirestore) { }

  async saveFuncionario(funcionario: Funcionario) {
    return new Promise<any>((resolve, reject) => {
      this.angularFirestore
        .collection('funcionarios')
        .add(funcionario)
        .then(response => { console.log(response) }, error => reject(error));
    });
  }
}
