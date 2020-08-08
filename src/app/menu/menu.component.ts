import { Component, OnInit, Inject, Injectable } from '@angular/core';
import { Dish } from '../shared/dish';

import { DishService } from '../services/dish.service';
import { flyInOut, expand } from '../animations/app.animation';
import { animation } from '@angular/animations';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display:block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class MenuComponent implements OnInit {

  dishes: Dish[];
  errmsg: string;

  constructor(private dishservice: DishService, @Inject('BaseURL') private baseURL) {

  }

  ngOnInit(): void {
    this.dishservice.getDishes().subscribe(dishes => this.dishes = dishes, emsg => this.errmsg = <any>emsg);
  }

}
