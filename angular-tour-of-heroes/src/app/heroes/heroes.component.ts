import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero'
import { HEROES } from '../mock-heroes';
import { HeroService } from '../hero.service';
import { Observable, of } from 'rxjs';



@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent {

heroes: Hero[] = [];
constructor(private heroService: HeroService) {}

selectedHero?: Hero;

ngOnInit(): void
{
  this.getHeroes();
} 

onSelect(hero:Hero): void
{
  this.selectedHero = hero;
}

getHeroes(): Observable <Hero[]>
{
  const heroes = of (HEROES);
  return heroes;
 }


}

