import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MessageService {
    private subject = new Subject<any>();

    checkAuth(logged: boolean) {
        this.subject.next({ logged });
    }
    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
}