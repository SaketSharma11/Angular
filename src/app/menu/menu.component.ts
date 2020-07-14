import { Component, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';
import { DishService } from '../services/dish.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  dishes: Dish[] = DISHES;
  selecteddish: Dish;
  constructor(private dishservice: DishService) {

  }

  ngOnInit(): void {
    this.dishes = this.dishservice.getDishes();
  }
  onSelect(mydish: Dish) {
    this.selecteddish = mydish;
  }

}
