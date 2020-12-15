import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { AppComponent } from './components/app/app.component';
import { AdminComponent } from './components/admin/admin.component';
import { UserComponent } from './components/user/user.component';
import { MainComponent } from './components/main/main.component';
import { AppHasRoleDirective } from './directives/app-has-role.directive';
import { SessionComponent } from './components/session/session.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    UserComponent,
    MainComponent,
    AppHasRoleDirective,
    SessionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: AppComponent },      
      // { path: 'products/:productId', component: HeroesComponent },
    ]),
    HttpClientModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
