// import { Injectable } from '@angular/core';
// import {
//   HttpRequest,
//   HttpHandler,
//   HttpEvent,
//   HttpInterceptor
// } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable()
// export class GlobalInterceptor implements HttpInterceptor {

//   baseUrl='https://upskilling-egypt.com:3006/api/v1/';
//   constructor() {}

//   intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

//     const modifiedRequest=request.clone({
//       url:`${this.baseUrl}${request.url}`
//     })
//     return next.handle(modifiedRequest);
//   }
// }

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class GlobalInterceptor implements HttpInterceptor {

  baseUrl = 'https://upskilling-egypt.com:3006/api/v1/';

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = localStorage.getItem("userToken"); 

    let modifiedRequest = request.clone({
      url: `${this.baseUrl}${request.url}`
    });

    if (token) {
      modifiedRequest = modifiedRequest.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(modifiedRequest);
  }
}

