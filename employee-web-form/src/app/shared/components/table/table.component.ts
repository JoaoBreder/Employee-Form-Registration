import { Component } from '@angular/core';
import { Funcionario } from '../../models/funcionario';
import { FirestoreService } from 'src/app/core/services/firestore/firestore.service';


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

  constructor(private firestore: FirestoreService) { }

  async ngOnInit(): Promise<void> {
    this.tableData = await this.firestore.getFuncionarios();
  }

  formatarEndereco(endereco: Endereco) {
    const { rua, cep, bairro, cidade, estado } = endereco;
    return `${rua}, ${bairro}, ${cidade} - ${estado}, ${cep}`;
  }
}
