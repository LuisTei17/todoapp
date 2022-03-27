import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiHttpService } from 'src/helpers/api';
import { StorageService } from 'src/helpers/storage';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  model: User;

  constructor(
    private api: ApiHttpService,
    private router: Router,
    private storage: StorageService) { 

    this.model = new User();
  }

  onSave() {
    this.api.post('user/auth', this.model).subscribe({
      next: this.savedUser.bind(this),
      error: this.invalidUserCall.bind(this)
    });
  }

  savedUser(resp: any) {
    if (!resp || !resp.token)
      return;

    this.storage.saveItem(resp.token);
    this.router.navigate(['projects']);
  }

  invalidUserCall(error: any) {
    console.log(error)
  }
}
