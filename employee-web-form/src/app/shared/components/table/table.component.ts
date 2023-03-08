import { Component } from '@angular/core';
import { Funcionario } from '../../models/funcionario';
import { FirestoreService } from 'src/app/core/services/firestore/firestore.service';
import { SendDataService } from 'src/app/core/services/sendData/send-data.service';
import { Subscription } from 'rxjs';


interface Endereco {
  rua: string | null | undefined;
  cep: string | null | undefined;
  bairro: string | null | undefined;
  cidade: string | null | undefined;
  estado: string | null | undefined;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  columns: string[] = ['foto', 'nome', 'cpf', 'email', 'dataContratacao', 'endereco', 'ativo'];
  tableData: Funcionario[] = [];
  subscription: Subscription;

  constructor(
    private firestore: FirestoreService,
    private sendData: SendDataService
  ) {
    this.subscription = this.sendData.getFuncionario().subscribe((funcionario) => {
      this.adicionarFuncionario(funcionario);
    });
  }

  async ngOnInit(): Promise<void> {
    const funcionarios = await this.firestore.getFuncionarios();
    this.tableData = funcionarios.sort(this.sortFunction);
  }

  formatarEndereco(endereco: Endereco) {
    const { rua, cep, bairro, cidade, estado } = endereco;
    return `${rua}, ${bairro}, ${cidade} - ${estado}, ${cep}`;
  }

  adicionarFuncionario(funcionario: Funcionario) {
    const funcionarios = [...this.tableData];
    funcionarios.push(funcionario);
    this.tableData = funcionarios.sort(this.sortFunction);
  }

  private sortFunction(a: Funcionario, b: Funcionario): number {
    if (a.nome.toLowerCase() < b.nome.toLowerCase()) {
      return -1;
    }
    if (a.nome.toLowerCase() > b.nome.toLowerCase()) {
      return 1;
    }
    return 0;
  }
}
