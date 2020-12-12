import { Component, OnInit } from '@angular/core';
// import { UserComponent } from '../user/user.component';
// import { AdminComponent } from '../admin/admin.component';
// import { AppHasRoleDirective } from './directives/app-has-role.directive';
// import { HeroService } from '../hero.service';
import { Session } from '../../entity/session'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor() { }

  session: Session

  ngOnInit(): void {
  }

}
