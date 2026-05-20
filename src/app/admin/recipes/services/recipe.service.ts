import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
private readonly httpClient =inject(HttpClient);
 

  getAllRecipies(myParams?: any):Observable<any>{
return this.httpClient.get('recipe', { params: myParams })
}
addRecipe(data:FormData):Observable<any>{
return this.httpClient.post('recipe',data)
}
getAllTags(): Observable<any> {
  return this.httpClient.get('tag');
}

getAllCategories(): Observable<any> {
  return this.httpClient.get('category?pageSize=100&pageNumber=1');
}

updateRecipes(id: number, data: FormData):Observable<any>{
  return this.httpClient.put(`recipe/${id}`,data)
}
getRecipeById(id:number):Observable<any>{
return this.httpClient.get(`recipe/${id}`)
}

deleteRecipe(id: number): Observable<any> {
  return this.httpClient.delete(`recipe/${id}`);
}
}

