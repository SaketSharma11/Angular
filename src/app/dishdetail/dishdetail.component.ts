import { Component, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DishService } from '../services/dish.service';
import { SafeResourceUrl } from '@angular/platform-browser';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comments } from '../shared/exercise';




@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})

export class DishdetailComponent implements OnInit {
  Date = Date.now();
  mydish: Dish;
  dishIds: string[];
  prev: string;
  next: string;
  rform: FormGroup;
  cmm: Comments;
  Dishes: Dish[];





  constructor(private fb: FormBuilder, private dishservice: DishService, private route: ActivatedRoute, private location: Location) {
    this.createform();



  }
  formerrors = {
    'name': '',
    'rating': 5,
    'comment': ''
  };
  validationmessages = {
    'name': {
      'required': 'Author Name is required',
      'minlength': 'Author Name must be atleast 2 charater long',
      'maxlength': 'Author Name cannot be more than 25 characters long'
    },

    'comment': {
      'required': 'comment is required'

    },
  };
  createform() {
    this.rform = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      comment: ['', Validators.required],
      rating: [0]
    });
    this.rform.valueChanges.subscribe(data => this.onvaluechanged(data));
    this.onvaluechanged();

  }
  onvaluechanged(data?: any) {
    if (!this.rform) {
      return;
    }
    const form = this.rform;
    for (const field in this.formerrors) {
      if (this.formerrors.hasOwnProperty(field)) {
        //clear previous error msg ,if there
        this.formerrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const message = this.validationmessages[field];
          for (const key in control.errors) {
            this.formerrors[field] += message[key] + ' ';
          }
        }
      }
    }

  }

  formatLabel(value: number) {


    return value;

  }


  onsubmit() {

    this.cmm = this.rform.value;
    console.log(this.cmm);
    this.rform.reset(
      {
        name: '',
        comment: ''
      }
    );

  }


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
