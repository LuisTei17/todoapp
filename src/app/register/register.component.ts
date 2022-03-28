import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiHttpService } from 'src/helpers/api.service';
import { User } from '../models/user';
import { SpinnerComponent } from '../shared/spinner/spinner.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  model: User;
  message: string = '';
  type: string = '';
  show: boolean = false;

  constructor(private api: ApiHttpService, private route: Router, private spinnerService: SpinnerComponent) { 
    this.model = new User();
  }

  checkForm(model: User) {
    if (!model.name) {
      this.showMessage('Nome não informado', 'error');
      return;
    }
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

    const validForm = this.checkForm(this.model);

    if (!validForm)
      return;
    
    this.spinnerService.show();
    this.api.post('user', this.model).subscribe({
      next: this.savedUser.bind(this),
      error: this.invalidUserCall.bind(this)
    });
  }

  savedUser(resp: any) {
    this.spinnerService.hide();
    console.log(resp)
    this.route.navigate(['']);
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
