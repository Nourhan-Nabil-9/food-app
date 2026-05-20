import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteComponent } from 'src/app/shared/delete/delete.component';
import { FavRecipeService } from './services/fav-recipe.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-recipes',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent {
 private readonly toastr=inject(ToastrService);

  private readonly favRecipeService = inject(FavRecipeService);
  private readonly matDialog=inject(MatDialog);

  favoritesData: any[] = [];
  tagsList: any[] = [];
  categoriesList: any[] = [];
  totalCount: number = 0;
  imgUrl: string = 'https://upskilling-egypt.com:3006/';

 

  ngOnInit(): void {
    this.getFavorites();
    this.getTags();
    this.getCategories();
  }

  getFavorites() {
    this.favRecipeService.getAllFav().subscribe({
      next: (res:any) => {
       
        this.favoritesData = res.data;
      },
      error: (err:any) => console.log(err)
    });
  }

  removeItem(favId: number,recipeName:string): void {
  const dialogRef = this.matDialog.open(DeleteComponent, {
    width: '400px',
    data: { name: recipeName }
  });

  dialogRef.afterClosed().subscribe((result) => {
    if (result) {
    
      this.deleteFavorite(favId);
    }
  });
}

deleteFavorite(id: number) {
  this.favRecipeService.removeFav(id).subscribe({
    next: (res) => {
      console.log(res);
      
      this.toastr.error('Recipe removed from Your favorites');
      this.getFavorites();
    },
    error: (err) => console.log(err)
  });
}
    

 getTags() {
    this.favRecipeService.getAllTags().subscribe({
      next: (res:any) => this.tagsList = res
    });
  }

  getCategories() {
   
    this.favRecipeService.getAllCategories().subscribe({
      next: (res:any) => this.categoriesList = res.data
    });
  }
 

     
}
