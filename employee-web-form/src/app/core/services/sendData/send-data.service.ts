import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Funcionario } from 'src/app/shared/models/funcionario';

@Injectable({
  providedIn: 'root'
})
export class SendDataService {
  private subject = new Subject<any>();

  sendFuncionario(funcionario: Funcionario) {
    this.subject.next(funcionario);
  }

  getFuncionario(): Observable<any> {
    return this.subject.asObservable();
  }
}
