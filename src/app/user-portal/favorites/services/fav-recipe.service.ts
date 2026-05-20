import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavRecipeService {
 private readonly httpClient =inject(HttpClient)


 getAllFav(myParams?: any):Observable<any>{
  return this.httpClient.get('userRecipe', { params: myParams });
 }

 addToFav(id: number): Observable<any> {
  return this.httpClient.post('userRecipe', { recipeId: id });
}
removeFav(id: number): Observable<any> {
  return this.httpClient.delete(`userRecipe/${id}`);
}
 getAllTags(): Observable<any> {
  return this.httpClient.get('tag');
}

getAllCategories(): Observable<any> {
  return this.httpClient.get('category?pageSize=100&pageNumber=1');
}
}
