import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiHttpService } from 'src/src/helpers/api';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  model: User;

  constructor(private api: ApiHttpService, private router: Router) { 
    this.model = new User();
  }

  onSave() {
    this.api.post('user/auth', this.model).subscribe({
      next: this.savedUser.bind(this),
      error: this.invalidUserCall.bind(this)
    });
  }

  savedUser(resp: any) {
    console.log(resp)
    this.router.navigate(['projects']);
  }

  invalidUserCall(error: any) {
    console.log(error)
  }
}
