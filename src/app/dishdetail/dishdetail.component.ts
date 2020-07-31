import { Component, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DishService } from '../services/dish.service';


@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {
  mydish: Dish;

  constructor(private dishservice: DishService, private route: ActivatedRoute, private location: Location) { }

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    this.dishservice.getdish(id).subscribe(mydish => this.mydish = mydish);

  }
  goback(): void {
    this.location.back();
  }

}
