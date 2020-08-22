import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';

import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { DishService } from '../services/dish.service';
import { Leader } from '../shared/leader';

import { LeaderService } from '../services/leader.service';
import { flyInOut, expand } from '../animations/app.animation';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display:block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class HomeComponent implements OnInit {
  dish: Dish;
  disherrmsg: string;
  leadererrmsg: string;
  promotionerrmsg: string;
  leader: Leader;
  promotion: Promotion;
  constructor(private dishservice: DishService, private promotionservice: PromotionService, private leaderservice: LeaderService, @Inject('BaseURL') private baseURL) { }

  ngOnInit(): void {
    this.dishservice.getfeatureddish().subscribe(dish => this.dish = dish, emsg => this.disherrmsg = emsg);
    this.promotionservice.getfeaturedpromotion().subscribe(promotion => this.promotion = promotion, emsg => this.promotionerrmsg = emsg);
    this.leaderservice.getleader().subscribe(leader => this.leader = leader, emsg => this.leadererrmsg = emsg);
  }


}
