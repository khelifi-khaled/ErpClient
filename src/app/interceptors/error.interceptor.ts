import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NbToastrService } from "@nebular/theme";
import { Observable, catchError } from "rxjs";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private readonly _toaster: NbToastrService,
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError(xhr => {
      
      switch (xhr.status){
        case 400: 
          xhr.error.errors.forEach((error: any) => {this._toaster.danger(error.description,error.code)});
        break;
        case 401:
          xhr.error.errors.forEach((error: any) => {this._toaster.danger(error.description,error.code)});
          break;
        case 403:
          xhr.error.errors.forEach((error: any) => {this._toaster.danger(error.description,error.code)});
          break;
        case 404: 
          xhr.error.errors.forEach((error: any) => {this._toaster.danger(error.description,error.code)});
          break;
        case 500:
          xhr.error.errors.forEach((error: any) => {this._toaster.danger(error.description,error.code)});
          break;
        default:
          xhr.error.errors.forEach((error: any) => {this._toaster.danger(error.description,error.code)});
          break;
      };
      
      throw new Error(xhr);
    }));
  }
}
