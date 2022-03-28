import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ApiHttpService } from 'src/helpers/api.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProjectsComponent } from './projects/projects.component';
import { StorageService } from 'src/helpers/storage.service';
import { InterceptorModule } from 'src/helpers/interceptors/interceptors.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { NgbdToastInline } from './shared/toast/toast.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'src/helpers/message.service';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AppComponent,
    SpinnerComponent,
    RegisterComponent,
    LoginComponent,
    ProjectsComponent,
    NgbdToastInline

  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    InterceptorModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    })
  ],
  providers: [ApiHttpService, StorageService, SpinnerComponent, NgbdToastInline, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
