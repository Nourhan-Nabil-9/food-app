
import { Component, OnInit, inject } from '@angular/core';
import { MatDialog  } from '@angular/material/dialog';
import { DeleteComponent } from 'src/app/shared/delete/delete.component'; 
import { RecipeService } from './services/recipe.service';
import { ViewComponent } from 'src/app/shared/view/view.component';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-recipes',
  
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  
})
export class RecipesComponent implements OnInit {
  [x: string]: any;
  private readonly recipeService = inject(RecipeService);
  private readonly matDialog=inject(MatDialog)
listData:any
  length = 50;
  pageSize = 6;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
totalNumberOfRecords:any

  recipesData: any[] = [];
  tagsList: any[] = [];
  categoriesList: any[] = [];
  totalCount: number = 0;
  imgUrl: string = 'https://upskilling-egypt.com:3006/';

  searchParams = {
    name: '',
    tagId: '',
    categoryId: '',
    pageSize: 10,
    pageNumber: 1
  };

  ngOnInit(): void {
    this.getRecipes();
    this.getTags();
    this.getCategories();
  }

  getRecipes() {
    this.recipeService.getAllRecipies(this.searchParams).subscribe({
      next: (res:any) => {
       
        
        this.recipesData = res.data;
        this.totalCount = res.totalNumberOfRecords;
      },
      error: (err:any) => console.log(err)
    });
  }

  getTags() {
    this.recipeService.getAllTags().subscribe({
      next: (res:any) => this.tagsList = res
    });
  }

  getCategories() {
   
    this.recipeService.getAllCategories().subscribe({
      next: (res:any) => this.categoriesList = res.data
    });
  }


  openDeleteDialog(recipeItem: any){
  const dialogRef = this.matDialog.open(DeleteComponent, {
      
    });
     dialogRef.afterClosed().subscribe({
      next:(res:any)=>{
        console.log(res);
      let  result=res;
      if(result){
     this.deleteRecipe(recipeItem.id);
      }
        
      }
     })}
     deleteRecipe(id:number){
  this.recipeService.deleteRecipe(id).subscribe({
    next:(res)=>{
      console.log(res);
      this.getRecipes()
      
    },
    error:(err)=>{
      console.log(err);
      
    }
  })
     }
   
     
     constructor(private dialog: MatDialog) {}
     
       openRecipeDetails(item: any) {
         this.dialog.open(ViewComponent, {
           width: '600px',
     panelClass: 'custom-dialog-container' ,
          data: item 
         });
       }
  pageEvent!: PageEvent;

       handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex +1;

    this.getRecipes()
  }
  
}

