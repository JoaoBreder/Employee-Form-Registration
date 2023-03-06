import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  form!: FormGroup;
  mostrarModal: boolean = false;
  loading: boolean = false;
  errMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private notification: NzNotificationService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nome: ['', Validators.required],
      cpf: ['', Validators.required],
      email: ['', Validators.required],
      dataContratacao: ['', Validators.required],
      rua: ['', Validators.required],
      cep: ['', Validators.required],
      bairro: ['', Validators.required],
      cidade: ['', Validators.required],
      estado: ['', Validators.required]
    });
  }

  toggle() {
    this.mostrarModal = !this.mostrarModal
  }

  private sendNotification(): void {
    this.notification.error('Erro ao Salvar Funcionário', this.errMessage);
  }

  get f() { return this.form.controls; }

  getFieldValue(field: string) {
    return this.f[field].value;
  }

  async onSubmit() {
    if (this.form.invalid) {
      this.errMessage = 'Preencha todos os campos do formulário.';
      this.sendNotification();
      return;
    }

    this.loading = true;

    const item = {
      ativo: true,
      foto: 'foto',
      nome: this.getFieldValue('nome'),
      cpf: this.getFieldValue('cpf'),
      email: this.getFieldValue('email'),
      dataContratacao: this.getFieldValue('dataContratacao'),
      endereco: {
        rua: this.getFieldValue('rua'),
        cep: this.getFieldValue('cep'),
        bairro: this.getFieldValue('bairro'),
        cidade: this.getFieldValue('cidade'),
        estado: this.getFieldValue('estado'),
      }
    }

    console.log(item);

    setTimeout(() => {
      this.form.reset();
      this.loading = false;
      this.toggle();
    }, 500);
  }
}
