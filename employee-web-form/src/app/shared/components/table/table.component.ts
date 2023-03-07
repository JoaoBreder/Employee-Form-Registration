import { Component } from '@angular/core';
import { Funcionario } from '../../models/funcionario';
import { FirestoreService } from 'src/app/core/services/firestore/firestore.service';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  columns: string[] = ['foto', 'nome', 'email', 'dataContratacao', 'ativo'];
  tableData: Funcionario[] = [];

  constructor(private firestore: FirestoreService) { }

  async ngOnInit(): Promise<void> {
    this.tableData = await this.firestore.getFuncionarios();
  }
}
