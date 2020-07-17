import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor() { }
  getpromotions(): Promotion[] {
    return PROMOTIONS;
  }
  getpromotion(id: string): Promotion {
    return PROMOTIONS.filter((promo) => (promo.id === id))[0];
  }
  getfeaturedpromotion(): Promotion {
    return PROMOTIONS.filter((promotion) => promotion.featured)[0];

  }
}
