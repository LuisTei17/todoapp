import { Injectable } from '@angular/core';
import { 
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest }
from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../storage';
@Injectable()
export class Interceptor implements HttpInterceptor {
    constructor(private storageService : StorageService) {}
    intercept( request: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
        const token = this.storageService.retrieveItem();
        if (token) {
            request = request.clone({
                setHeaders: {
                    'token': token
                }
            })
        }
        return next.handle(request);
    }
}