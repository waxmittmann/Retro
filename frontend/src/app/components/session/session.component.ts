import { Component, OnInit } from '@angular/core';
import { Session } from '../../entity/session'
import { SessionService, JoinSessionResponse } from 'src/app/services/session.service';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css'],
})
export class SessionComponent implements OnInit {

  constructor(private sessionService: SessionService) { }

  session: Session
  token: string

  ngOnInit(): void {
    console.log("HELLS BELLS")
    this.sessionService.pollForSession2().subscribe(session => {
      console.log("Got session! Hells Well!")
      console.log(session)
      this.session = session
    })
    console.log("HELLS Cells")
  }

  createSession(): void {
    console.log("Create session!")
    this.sessionService.createSession().subscribe(session => {
      console.log(session)
      this.session = session
    });
  }


  joinSession(event) {
  
    this.sessionService.joinSession(event.target.value).subscribe((message: JoinSessionResponse) => {
      console.log(message)
      // console.log("Token:")
      // console.log(token)
      localStorage.setItem("token", message.token)
      console.log("Tokenzz: " + message.token)
      this.token = message.token
    })
    console.log("You entered: ", event.target.value);
  }

}
