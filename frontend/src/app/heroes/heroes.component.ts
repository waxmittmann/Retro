import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  // hero: Hero = {
  //   id: 1,
  //   name: 'Windstorm'
  // };

  

  heroes: Hero[] = [{
    id: 1,
    name: 'Windstorm'
  },{
    id: 2,
    name: 'Pecker'
  },{
    id: 3,
    name: 'Wood'
  }];

  productId = -1;

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      console.log("Got " + +params.get('productId'));
      this.productId = parseInt(params.get('productId'));
      // this.productId = +params.get('productId');
    });
  }

  selectedHero: Hero;

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

}