import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

@NgModule({
  declarations: [
    ModalComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgxMaskDirective,
    NgxMaskPipe
  ],
  exports: [
    ModalComponent,
  ],
  providers: [
    NzModalService,
    provideNgxMask()
  ]
})
export class ModalModule {

}
