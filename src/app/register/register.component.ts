import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiHttpService } from 'src/src/helpers/api';
import { User } from '../models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  model: User;

  constructor(private api: ApiHttpService, private router: Router) { 
    this.model = new User();
  }

  onSave() {
    this.api.post('user', this.model).subscribe({
      next: this.savedUser.bind(this),
      error: this.invalidUserCall.bind(this)
    });
  }

  savedUser(resp: any) {
    console.log(resp)
    this.router.navigate(['']);
  }

  invalidUserCall(error: any) {
    console.log(error)
  }
}
