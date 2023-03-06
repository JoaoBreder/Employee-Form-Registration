import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';

@NgModule({
  declarations: [
    ModalComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    ModalComponent,
  ],
  providers: [
    NzModalService,
  ]
})
export class ModalModule {

}
