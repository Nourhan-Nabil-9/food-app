import { Component, inject, Inject } from '@angular/core'; // تأكد إن Inject مكتوبة بحرف I كبير
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FavRecipeService } from 'src/app/user-portal/favorites/services/fav-recipe.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ViewComponent {
  private readonly favRecipeService = inject(FavRecipeService);
  private readonly toastrService=inject(ToastrService);
  
  constructor(
    public dialogRef: MatDialogRef<ViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    
  } 


addToMyFav(id:number){
  this.favRecipeService.addToFav(id).subscribe({
    next:(res)=>{
      console.log(res);
      this.dialogRef.close();
      this.toastrService.success('Your Recipe added to Your Favorites Successfully')
    },
    error:(err)=>{
      console.log(err);
      
    }
  })
}

  close(): void {
    
    this.dialogRef.close();
  }
  
}