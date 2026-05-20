import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './categories.component';
import { AddEditCategoryComponent } from './componants/add-edit-category/add-edit-category.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    CategoriesComponent,
    AddEditCategoryComponent,
    
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    MatPaginatorModule,
   MatFormFieldModule,
   MatInputModule,
   FormsModule,
   MatButtonModule,
   MatDialogModule
  ]
})
export class CategoriesModule { }
