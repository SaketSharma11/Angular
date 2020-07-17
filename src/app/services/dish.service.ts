import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';
@Injectable({
  providedIn: 'root'
})
export class DishService {

  getDishes(): Dish[] {
    return DISHES;
  }
  getdish(id: string): Dish {
    return DISHES.filter((dish) => (dish.id === id))[0];
  }
  getfeatureddish(): Dish {
    return DISHES.filter((dish) => dish.featured)[0];
  }
  constructor() { }
}
