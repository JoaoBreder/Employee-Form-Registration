import { Component } from '@angular/core';
import { Funcionario } from '../../models/funcionario';

const TABLE_DATA: Funcionario[] = [
  {
    ativo: true,
    foto: 'foto',
    nome: 'Funcionário Teste',
    cpf: '026.249.453-18',
    email: 'teste@email.com',
    dataContratacao: '03/03/2023',
    endereco: {
      rua: 'Rua',
      cep: 'CEP',
      bairro: 'Bairro',
      cidade: 'Cidade',
      estado: 'Estado',
    }
  },
];


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  columns: string[] = ['foto', 'nome', 'email', 'dataContratacao', 'ativo'];
  tableData = TABLE_DATA;
}
