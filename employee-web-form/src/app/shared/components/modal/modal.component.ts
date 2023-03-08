import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { FirestoreService } from 'src/app/core/services/firestore/firestore.service';
import { SendDataService } from 'src/app/core/services/sendData/send-data.service';
import { Funcionario } from '../../models/funcionario';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  funcionarioForm!: FormGroup;
  mostrarModal: boolean = false;
  loading: boolean = false;
  message: string = 'Funcionário salvo com sucesso!';

  constructor(
    private formBuilder: FormBuilder,
    private notification: NzNotificationService,
    private modal: NzModalService,
    private authService: AuthService,
    private firestore: FirestoreService,
    private sendData: SendDataService
  ) { }

  ngOnInit(): void {
    this.funcionarioForm = this.formBuilder.group({
      ativo: ['', Validators.required],
      foto: ['', Validators.required],
      file: ['', Validators.required],
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

  onFileChange(e: any) {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = () => {
        this.funcionarioForm.patchValue({ file: reader.result });
      };
    }
  }

  private sendNotification(type: string): void {
    const title = type === 'error' ?
      'Erro ao Salvar Funcionário' :
      'Sucesso';

    type === 'error' ?
      this.notification.error(title, this.message) :
      this.notification.success(title, this.message);
  }

  get f() { return this.funcionarioForm.controls; }

  getFieldValue(field: string) {
    return this.f[field].value;
  }

  async onSubmit() {
    if (this.funcionarioForm.invalid) {
      this.message = 'Preencha todos os campos do formulário.';
      this.sendNotification('error');
      return;
    }

    this.loading = true;

    const {
      nome,
      cpf,
      email,
      dataContratacao,
      rua,
      cep,
      bairro,
      cidade,
      estado,
      ativo,
      file
    } = this.funcionarioForm.value;

    const item: Funcionario = {
      ativo: ativo === 'true',
      cpf,
      dataContratacao,
      email,
      endereco: {
        rua,
        cep,
        bairro,
        cidade,
        estado
      },
      foto: file,
      uid: this.authService.currentUser?.uid,
      nome,
    };

    this.firestore.saveFuncionario(item);

    setTimeout(() => {
      this.sendData.sendFuncionario(item);
      this.funcionarioForm.reset();
      this.loading = false;
      this.sendNotification('success');
      this.toggle();
    }, 500);
  }

  async onCancel() {
    this.modal.confirm({
      nzTitle: 'Tem certeza que deseja cancelar?',
      nzContent: 'Ao clicar no botão Ok, você confirma que deseja cancelar o cadastramento desse funcionário e perder todos os dados informados.',
      nzOnOk: () => {
        this.funcionarioForm.reset();
        this.toggle();
      },
      nzOnCancel: () => { return },
      nzClosable: false,
    });
  }
}
