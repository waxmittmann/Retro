import { Injectable, OnInit } from '@angular/core';
import { Observable, of, timer, interval } from 'rxjs';
// import { map, switchMap, flatMap, filter, take, amb } from 'rxjs/operators';
import { map, switchMap, flatMap, filter, take } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Session } from '../entity/session'
// interface Session {
//   name: string;
// }

export class JoinSessionResponse {
  session: string
  token: string
}

// export class JoinByName {
//   name: string
// }
// export class JoinByToken {
//   token: string
// }


@Injectable({
  providedIn: 'root'
})
export class SessionService implements OnInit {

  constructor(private http: HttpClient) { }

  session: Session;
  token: string;

  ngOnInit(): void {

    console.log("OnInit called")
    // const ws = new WebSocket('ws://localhost:3030');
    // ws.onopen = () => { 
    //   console.log('Now connected'); 
    // };

    // timer(5000, 10000).pipe(
    //   switchMap(_ => this.getSession())
    // ).subscribe(session => {
    //   console.log("Got session")
    //   console.log(session)
    //   this.session = session;
    // });
  }


  token(): string {
    return localStorage.get("token")  
  }


  createSession(): Observable<Session> {
    return this.http.put<Session>("/session", {})
  }

  getSession(): Observable<Session> {
    return this.http.get<Session>("/session")
  }

  rejoinSession(token: string): Observable<Session> {
    
  }

  joinSession(username: string): Observable<JoinSessionResponse> {
  // joinSession(joinData: JoinByName | JoinByToken): Observable<JoinSessionResponse> {
    return this.http.put<JoinSessionResponse>("/session/join", username)
  }

  // joinSession(username: string): Observable<JoinSessionResponse> {
  //   return this.http.put<JoinSessionResponse>("/session/join", username)
  // }

  pollForSession2(): Observable<Session> { 
    const poll = interval(1000).pipe(
      switchMap(_ => this.http.get<Session>("/session")),
      filter(session => session != null),
      take(1)
    )
    return poll
  }

  x() { 
    console.log("Setting up poll")

    const poll = interval(1000).pipe(
      switchMap(_ => this.http.get<Session>("/session")))

    const unsub = poll.subscribe(session => {
        console.log("Polling")
        if (session != null) {
          console.log("Got active session")
          this.session = session
          unsub.unsubscribe()
        }
      })

    // interval(1000).pipe(
    //   switchMap(_ =>
    //     this.http.get<Session>("/session").pipe(
    //       filter(session => session != null),
    //       take(1),
    //       amb(
    //         Observable.timer(1000)
    //           .flatMap(() => Observable.throw(new Error('Timeout')))
    //       )


    // interval(1000).pipe(
    //   switchMap(_ =>
    //     this.http.get<Session>("/session").fil
    //       filter(session => session != null).take(1)

    // interval(1000).pipe(
    //   switchMap(_ =>
    //     this.http.get<Session>("/session").pipe(
    //       filter(session => session != null).take(1)
      

    // this.http.get<Session>("/session").pipe(
    //   flatMap(jobQueueData =>


    // Observable
    // .fromPromise(submitJobToQueue(jobData))
    // .flatMap(jobQueueData =>
    //   Observable.interval(1000)
    //     .flatMap(() => pollQueueForResult(jobQueueData.jobId))
    //     .filter(x => x.completed)
    //     .take(1)
    //     .map(() => 'Completed')
    //     .amb(
    //       Rx.Observable.timer(60000)
    //         .flatMap(() => Rx.Observable.throw(new Error('Timeout')))
    //     )
    // )
    // .subscribe(
    //   x => console.log('Result', x),
    //   x => console.log('Error', x)
    // )
  
  }
}

