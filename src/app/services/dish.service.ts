import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';
@Injectable({
  providedIn: 'root'
})
export class DishService {

  getDishes(): Promise<Dish[]> {
    return Promise.resolve(DISHES);
  }
  getdish(id: string): Promise<Dish> {
    return Promise.resolve(DISHES.filter((dish) => (dish.id === id))[0]);
  }
  getfeatureddish(): Promise<Dish> {
    return Promise.resolve(DISHES.filter((dish) => dish.featured)[0]);
  }
  constructor() { }
}
