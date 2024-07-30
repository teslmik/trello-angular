import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule, Routes } from '@angular/router';
import { TrelloComponent, TrelloListComponent } from './components';
import { MatButtonModule } from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatListModule} from '@angular/material/list';
import { TrelloItemComponent } from './components/trello-item/trello-item.component';

const routes: Routes = [{ path: '', component: TrelloComponent }];

@NgModule({
  declarations: [TrelloComponent, TrelloListComponent, TrelloItemComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatLabel,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatListModule
  ],
})
export class TrelloModule {}
