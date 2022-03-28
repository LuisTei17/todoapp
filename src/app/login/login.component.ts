import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiHttpService } from 'src/helpers/api.service';
import { StorageService } from 'src/helpers/storage.service';
import { User } from '../models/user';
import { SpinnerComponent } from '../shared/spinner/spinner.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  model: User;
  message: string = '';
  type: string = '';
  show: boolean = false;

  constructor(
    private api: ApiHttpService,
    private route: Router,
    private storage: StorageService,
    private spinnerService: SpinnerComponent) { 

    this.model = new User();
  }

  checkForm(model: User) {
    if (!model.email) {
      this.showMessage('Email não informado', 'error');
      return;
    }
    if (!model.password) {
      this.showMessage('Senha não informada', 'error');
      return;
    }

    return true;
  }

  onSave() {
    const valid = this.checkForm(this.model);

    if (!valid)
      return;

    this.spinnerService.show();
    this.api.post('user/auth', this.model).subscribe({
      next: this.savedUser.bind(this),
      error: this.invalidUserCall.bind(this)
    });
  }

  savedUser(resp: any) {
    if (!resp || !resp.token)
      return;

    this.spinnerService.hide();
    this.storage.saveItem(resp.token);
    this.route.navigate(['projects']);
  }

  invalidUserCall(error: string) {
    this.showMessage(error, 'error');
    this.spinnerService.hide();
    console.log(error)
  }

  showMessage(message: string, type: string) {
    this.message = message;
    this.type = type;
    this.show = true;
  }
}
