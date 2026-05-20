import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { RecipeService } from '../../services/recipe.service';
import { ToastrService } from 'ngx-toastr';
import { formatDate } from '@angular/common';
import { group } from '@angular/animations';


@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css'],

})

export class AddEditComponent implements OnInit {
private readonly toastrService=inject(ToastrService);
private readonly fb=inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly recipeService = inject(RecipeService);
  private readonly activatedRoute = inject(ActivatedRoute);





  recipeId:number=0;
recipeImagePath: string = '';
recipeData:any;

  files: File[] = [];
  imageFile: File | null = null;

  tags: any[] = [];
  categories: any[] = [];

  recipeForm = new FormGroup({
  name: new FormControl('', [Validators.required]),
  tagId: new FormControl('', [Validators.required]),
  price: new FormControl('', [Validators.required ,Validators.min(1)]),
  categoriesIds: new FormControl('', Validators.required),
  description: new FormControl('', [Validators.required, Validators.minLength(10)]),
  recipeImage: new FormControl<File | null>(null)
});

 
ngOnInit(): void {
  this.getTags();
  this.getCategories();

const id = this.activatedRoute.snapshot.paramMap.get('id');
  
  
    this.recipeId = Number(id);
    this.getRecipeDetails();
 
 if (this.recipeId) {
    this.getRecipeDetails();
  }
}

  getTags() {
    this.recipeService.getAllTags().subscribe({
      next: (res) => {
        this.tags = res;
      }
    });
  }

  getCategories() {
    this.recipeService.getAllCategories().subscribe({
      next: (res) => {
        this.categories = res.data;
      }
    });
  }

 getRecipeDetails() {
   
   this.recipeService.getRecipeById(this.recipeId).subscribe({


         next: (res) => {
      
      console.log(res);
        this.recipeData=res;
 this.recipeForm.patchValue({     
        name: this.recipeData.name,
        tagId: this.recipeData.tag.id,
         price: this.recipeData.price,
        description: this.recipeData.description,
categoriesIds: this.recipeData.category.map((item:any)=>item.id),
        
       });
          this.recipeImagePath = this.recipeData.imagePath;

      },
     error:(err)=>{
       console.log(err);
      
    },

  });
 }

  onSelect(event: any) {
    this.files = [...event.addedFiles];
    this.imageFile = this.files[0];

    this.recipeForm.patchValue({
      recipeImage: this.imageFile
    });
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
    this.imageFile = null;
  }


onSubmit() {
  if (this.recipeForm.invalid) {
    this.recipeForm.markAllAsTouched(); 
    return;
  }

  const formValues = this.recipeForm.getRawValue();
  const sendRecipeData = new FormData();

  sendRecipeData.append('name', formValues.name!);
  sendRecipeData.append('tagId', formValues.tagId!);
  sendRecipeData.append('price', formValues.price!);
  sendRecipeData.append('description', formValues.description!);
  
 
  sendRecipeData.append('categoriesIds', formValues.categoriesIds!);

  if (this.imageFile) {
    sendRecipeData.append('recipeImage', this.imageFile);
  }

  if (this.recipeId) {
    this.updateRecipe(sendRecipeData);
  } else {
    this.createRecipe(sendRecipeData);
  }
}
  createRecipe(recipeData: FormData) {
    this.recipeService.addRecipe(recipeData).subscribe({
      next: (res) => {
        console.log( res.message);
        this.toastrService.success(res.message)
        this.router.navigate(['/dashboard/admin/recipes']);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  updateRecipe(formData: FormData) {
    this.recipeService.updateRecipes(this.recipeId, formData).subscribe({
      next: (res) => {
        console.log( res);
        this.toastrService.success('The Rescipe was updated successfully')
       this.router.navigate(['/dashboard/admin/recipes']);
      },
    
      error: (err) => {
        console.log(err);
      }
    });
  }







}



