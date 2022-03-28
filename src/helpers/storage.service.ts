// Angular Modules 
import { Injectable } from '@angular/core'; 
import { environment } from '../environments/environment';
import { MessageService } from './message.service';
 
const { serverUrl } = environment;
const TOKEN_KEY = 'todoapp'
@Injectable() 
export class StorageService {
    constructor(private messageService: MessageService){} 
    
    public saveItem(data: object) { 
        this.messageService.checkAuth(true);
        return localStorage.setItem(TOKEN_KEY, JSON.stringify(data)); 
    }

    public retrieveToken() {
        const data = localStorage.getItem(TOKEN_KEY);
        if (!data)
            return;
        return JSON.parse(data);
    }

    public removeToken() {
        localStorage.removeItem(TOKEN_KEY);
        this.messageService.checkAuth(false);

    }
}