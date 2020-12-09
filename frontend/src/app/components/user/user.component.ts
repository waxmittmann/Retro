import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { DataService } from '../../services/data.service';
import { Thought, ThoughtType } from '../../entity/thought';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  selectedThought: Thought;

  thoughts = [
    {
      id: 0,
      content: "This is a thought",
      type: ThoughtType.Positive
    },
    {
      id: 1,
      content: "This is a much longer thought. We're really talking on this one, wohoo wow wow wow wow.",
      type: ThoughtType.Negative
    },
  ]

  constructor(private http: HttpClient, dataService: DataService) { 

    const ws = new WebSocket('ws://localhost:3030');
    ws.onopen = () => { 
      console.log('Now connected'); 
    };

    timer(5000, 10000).pipe(
      switchMap(_ => this.getThoughts())
    ).subscribe(data => {
      this.thoughts = data;
    });

    const numbers = timer(5000, 10000).pipe(map(v => {
      return this.getThoughts()
    }));
    numbers.subscribe(x => {
      console.log(x)
    });


  }

  ngOnInit(): void {

    // console.log("Init!")
    // // Create observer object
    // const myObserver = {
    //   next: (x: Thought[]) => {
    //     this.thoughts = x
    //     console.log('Observer got a next value: ' + x)
    //   },
    //   error: (err: any) => { console.error('Observer got an error: '); console.log (err) },
    //   complete: () => console.log('Observer got a complete notification'),
    // };

    // let thoughts = this.getThoughts()
    // thoughts.subscribe(myObserver);


  }

  onSelect(thought: Thought): void {
    this.selectedThought = thought;
  }

  newThought(): void {
    console.log("!!!!!!!!")
    this.thoughts.push({
      id: 3,
      content: 'TODO',
      type: ThoughtType.Confusing
    })
  }

  getThoughts(): Observable<Thought[]> {
    return this.http.get<Thought[]>("/ideas")
  }
}
