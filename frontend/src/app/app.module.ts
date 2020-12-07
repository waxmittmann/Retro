import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { MainComponent } from './main/main.component';
import { SettingsComponent } from './settings/settings.component';
import { AppHasRoleDirective } from './app-has-role.directive';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    AdminComponent,
    UserComponent,
    SettingsComponent,
    MainComponent,
    AppHasRoleDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: AppComponent },      
      { path: 'settings', component: HeroesComponent },
      // { path: 'products/:productId', component: HeroesComponent },
      // { path: 'thingy', component: ThingyComponent },
    ]),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }


// @NgModule({
//   imports: [
//     BrowserModule,
//     ReactiveFormsModule,
//     RouterModule.forRoot([
//       { path: '', component: ProductListComponent },
//       { path: 'products/:productId', component: ProductDetailsComponent },
//     ])
//   ],
