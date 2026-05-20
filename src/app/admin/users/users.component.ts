import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteComponent } from 'src/app/shared/delete/delete.component';
import { UsersService } from './services/users.service';
import { RecipeService } from '../recipes/services/recipe.service';
import { ToastrService } from 'ngx-toastr';
import { ViewComponent } from 'src/app/shared/view/view.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
[x: string]: any;
  private readonly usersService = inject(UsersService);
  private readonly matDialog=inject(MatDialog)
private readonly recipeService =inject(RecipeService)
 private readonly toastr=inject(ToastrService);

  usersData: any[] = [];
  
  totalCount: number = 0;
  imgUrl: string = 'https://upskilling-egypt.com:3006/';

 

  ngOnInit(): void {
    this.getUsers();
   
  }

  getUsers() {
    this.usersService.getAllUsers().subscribe({
      next: (res:any) => {
       
        
        this.usersData = res.data;
        this.totalCount = res.totalNumberOfRecords;
      },
      error: (err:any) => console.log(err)
    });
  }
constructor(private dialog: MatDialog) {}
  openUserDetails(item: any) {
     this.dialog.open(ViewComponent, {
       width: '600px',
 panelClass: 'custom-dialog-container' ,
      data: item 
     });
   }
 getUserId(id:number){
  this.usersService.getUserById(id).subscribe({
    next:(res)=>{
      console.log(res);
      this.openUserDetails(id);
      
    },
    error:(err)=>{
      console.log(err);
      
    }
  })
     }

  openDeleteDialog(recipeItem: any){
  const dialogRef = this.matDialog.open(DeleteComponent, {
      
    });
     dialogRef.afterClosed().subscribe({
      next:(res:any)=>{
        console.log(res);
      let  result=res;
      if(result){
     this.deleteUserId(recipeItem.id);
      }
        
      }
     })}
     deleteUserId(id:number){
  this.usersService.deleteUser(id).subscribe({
    next:(res)=>{
      console.log(res);
       this.toastr.error('Recipe removed from Your favorites');
      this.getUsers()
      
    },
    error:(err)=>{
      console.log(err);
      
    }
  })
     }
}
