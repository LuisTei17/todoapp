// Angular Modules 
import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http'; 
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
 
const { serverUrl } = environment;

@Injectable() 
export class ApiHttpService { 
    
    constructor(private http: HttpClient){} 
    
    public get(url: string, options?: any): Observable<Object> { 
        return this.http.get(serverUrl + url, options); 
    } 
    
    public post(url: string, data: any, options?: any): Observable<Object> { 
        return this.http.post(serverUrl + url, data, options); 
    } 
    
    public put(url: string, data: any, options?: any): Observable<Object> { 
        return this.http.put(serverUrl + url, data, options); 
    } 
    
    public delete(url: string, options?: any): Observable<Object> { 
        return this.http.delete(serverUrl + url, options); 
    }
}