import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule, MatLabel, MatError } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

import { LoginComponent, RegistrationComponent } from './components';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
];

@NgModule({
  declarations: [LoginComponent, RegistrationComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatLabel,
    MatButtonModule,
    ReactiveFormsModule,
    MatError
  ],
})
export class AuthModule {}
