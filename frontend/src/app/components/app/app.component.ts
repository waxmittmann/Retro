import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { Session } from '../../entity/session'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Retro Time!';

  session: Session

  constructor(private sessionService: SessionService) { }

  ngOnInit(): void {
  }

}



