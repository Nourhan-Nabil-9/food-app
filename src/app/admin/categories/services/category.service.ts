import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
private readonly httpClient =inject(HttpClient);

  constructor() { }


   getAllCategories(myParams?: any):Observable<any>{
  return this.httpClient.get('category', { params: myParams })
  }
  addCategory(data:any):Observable<any>{
  return this.httpClient.post('category',data)
  }
  getCategoryById(id:number):Observable<any>{
return this.httpClient.get(`category/${id}`)
}
updateCategory(id: number, data: any):Observable<any>{
  return this.httpClient.put(`category/${id}`,data)
}

deleteCategory(id: number): Observable<any> {
  return this.httpClient.delete(`category/${id}`);
}

}
