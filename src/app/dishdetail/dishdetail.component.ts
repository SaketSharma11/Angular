import { Component, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DishService } from '../services/dish.service';
import { SafeResourceUrl } from '@angular/platform-browser';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {
  mydish: Dish;
  dishIds: string[];
  prev: string;
  next: string;

  constructor(private dishservice: DishService, private route: ActivatedRoute, private location: Location) { }

  ngOnInit(): void {

    this.dishservice.getdishids().subscribe(dishids => this.dishIds = dishids);
    this.route.params.pipe(switchMap((params: Params) => this.dishservice.getdish(params['id']))).subscribe(dish => { this.mydish = dish; this.setprevnext(dish.id); });
  }
  setprevnext(dishid: string) {
    const index = this.dishIds.indexOf(dishid);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }
  goback(): void {
    this.location.back();
  }

}
