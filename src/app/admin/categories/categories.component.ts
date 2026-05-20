import { Component, inject, OnInit } from '@angular/core';
import { CategoryService } from './services/category.service';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog  } from '@angular/material/dialog';
import { AddEditCategoryComponent } from './componants/add-edit-category/add-edit-category.component';
import { ToastrService } from 'ngx-toastr';
import { DeleteComponent } from 'src/app/shared/delete/delete.component';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
 
})
export class CategoriesComponent implements OnInit {
private readonly categoryService = inject(CategoryService);
private readonly dialog = inject(MatDialog);
private readonly toastrService=inject(ToastrService);


  categoriesList: any;
  listData:any
 
  pageSize = 10;
  pageNumber = 1;
  pageSizeOptions = [5, 10, 25];
totalNumberOfRecords:any

  ngOnInit(): void {
  
    this.getCategories();
  }
  getCategories() {
   let params ={
    pageNumber :this.pageNumber ,
    pageSize :this.pageSize
   }
    this.categoryService.getAllCategories(params).subscribe({
      next: (res:any) => {
        console.log(res);
        this.listData=res
        this.categoriesList = res.data 
      }
    });
  }
pageEvent!:PageEvent;
  handlePageEvent(e:PageEvent){
this.pageEvent = e;
    this.pageSize = e.pageSize;
    this.pageNumber = e.pageIndex + 1;

    this.getCategories();
  }
  
//add
openDialog(): void {
    const dialogRef = this.dialog.open(AddEditCategoryComponent, {
      data: {
        name: '',
      },
    });


dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if(result){
        this.addCategory(result)
      }

    });
  }
addCategory(categoryName:string){
let data={
name:categoryName
}
this.categoryService.addCategory(data).subscribe({
  next:(res)=>{
    console.log(res);
    this.toastrService.success('The Category was created successfully')

    this.getCategories();
  },
  error:(err)=>{
console.log(err);

  }
})


}
//edit

openEditDialog(categoryItem: any){
const dialogRef = this.dialog.open(AddEditCategoryComponent, {
    data: {
      name: categoryItem.name 
    },
  });
   dialogRef.afterClosed().subscribe({
    next:(res)=>{
      console.log(res);
    let  result=res;
    if(result){
    this.updateCategory(categoryItem.id ,result)
    }
      
    }
   })
  
}
updateCategory(id: number, categoryName: string) {
  const model = {
     name: categoryName }; 

  this.categoryService.updateCategory(id, model).subscribe({
    next: (res) => {
      this.toastrService.success('The Category was updated successfully')

      this.getCategories();
    },
    error: (err) => console.error(err)
  });
}

//delete

openDeleteDialog(categoryItem: any){
const dialogRef = this.dialog.open(DeleteComponent, {
    
  });
   dialogRef.afterClosed().subscribe({
    next:(res)=>{
      console.log(res);
    let  result=res;
    if(result){
   this.deleteCategory(categoryItem.id);
    }
      
    }
   })}
   deleteCategory(id:number){
this.categoryService.deleteCategory(id).subscribe({
  next:(res)=>{
    console.log(res);
    this.getCategories()
    
  },
  error:(err)=>{
    console.log(err);
    
  }
})
   }
  
}


