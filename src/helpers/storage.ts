// Angular Modules 
import { Injectable } from '@angular/core'; 
import { environment } from '../environments/environment';
 
const { serverUrl } = environment;
const TOKEN_KEY = 'todoapp'
@Injectable() 
export class StorageService { 
    
    constructor(){} 
    
    public saveItem(data: object) { 
        return localStorage.setItem(TOKEN_KEY, JSON.stringify(data)); 
    }

    public retrieveItem() {
        const data = localStorage.getItem(TOKEN_KEY);
        if (!data)
            return;
        return JSON.parse(data);
    }
}