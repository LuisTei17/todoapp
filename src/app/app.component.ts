import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MessageService } from 'src/helpers/message.service';
import { StorageService } from 'src/helpers/storage.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  title = 'todoapp';
  logged = false;
  messages: any[] = [];
  subscription: Subscription = new Subscription;

  constructor(
    private storageService: StorageService,
    private route: Router,
    private messageService: MessageService,
    translate: TranslateService) {

    translate.addLangs(['pt']);
    translate.setDefaultLang('pt');
    translate.use('pt');

    const token = this.storageService.retrieveToken();
    if (token)
      this.logged = true;
    else {
      this.logged = false;
    }

    this.subscription = this.messageService.getMessage().subscribe(auth => {
      this.logged = auth.logged;
      if (!this.logged)
        this.route.navigate(['']);

    });
  }

  logout() {
    this.storageService.removeToken();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
