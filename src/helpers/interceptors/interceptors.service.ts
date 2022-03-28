import { Injectable } from '@angular/core';
import { 
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest, 
  HttpErrorResponse}
from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { StorageService } from '../storage.service';
@Injectable()
export class Interceptor implements HttpInterceptor {
    constructor(private storageService : StorageService) {}
    intercept( request: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
        const token = this.storageService.retrieveToken();
        if (token) {
            request = request.clone({
                setHeaders: {
                    'token': token
                }
            })
        }
        return next.handle(request)
        .pipe(
            catchError((response: HttpErrorResponse) => {
                const FORBIDDEN_CODE = 403;
              if (response.status === FORBIDDEN_CODE)
                this.storageService.removeToken();
              return throwError(() => response.error.message);
            })
          );
    }
}

function $q(arg0: () => null) {
    throw new Error('Function not implemented.');
}
