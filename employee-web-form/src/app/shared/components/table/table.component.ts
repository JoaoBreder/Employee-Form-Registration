import { Component } from '@angular/core';
import { Table } from '../../models/table';

const TABLE_DATA: Table[] = [
  {
    foto: 'foto',
    nome: 'teste',
    email: 'teste@email.com',
    dataContratacao: '03/03/2023',
    ativo: 'Sim',
  },
  {
    foto: 'foto',
    nome: 'teste 2',
    email: 'teste2@email.com',
    dataContratacao: '04/03/2023',
    ativo: 'Sim',
  },
  {
    foto: 'foto',
    nome: 'teste 3',
    email: 'teste3@email.com',
    dataContratacao: '05/03/2023',
    ativo: 'Não',
  }
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
