import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { DishService } from '../services/dish.service';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';
import { LeaderService } from '../services/leader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  dish: Dish;
  leader: Leader;
  promotion: Promotion;
  constructor(private dishservice: DishService, private promotionservice: PromotionService, private leaderservice: LeaderService, @Inject('BaseURL') private baseURL) { }

  ngOnInit(): void {
    this.dishservice.getfeatureddish().subscribe(dish => this.dish = dish);
    this.promotionservice.getfeaturedpromotion().subscribe(promotion => this.promotion = promotion);
    this.leaderservice.getleader().subscribe(leader => this.leader = leader);
  }


}
