import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';

import { TableComponent } from './shared/components/table/table.component';
import { ModalModule } from './shared/components/modal/modal.module';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore'
import { environment } from 'src/environments/environment';

import { AuthService } from './core/services/auth/auth.service';
import { FirestoreService } from './core/services/firestore/firestore.service';
import { AuthGuard } from './core/guards/authGuard/auth-guard';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { pt_BR } from 'ng-zorro-antd/i18n';
import pt from '@angular/common/locales/pt';

registerLocaleData(pt);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    TableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    ModalModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
  ],
  providers: [
    AuthService,
    FirestoreService,
    AuthGuard,
    NzNotificationService,
    { provide: NZ_I18N, useValue: pt_BR }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
