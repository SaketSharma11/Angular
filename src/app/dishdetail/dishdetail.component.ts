import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DishService } from '../services/dish.service';
import { SafeResourceUrl } from '@angular/platform-browser';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Comment } from '../shared/comment';
import { trigger, state, style, animate, transition } from '@angular/animations';




@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  animations: [
    trigger('visibility', [
      state('shown', style({
        transform: 'scale(1.0)',
        opacity: 1
      })),
      state('hidden', style({
        transform: 'scale(0.5)',
        opacity: 0
      })),
      transition('* => *', animate('0.4s ease-in-out'))
    ])
  ]

})

export class DishdetailComponent implements OnInit {

  mydish: Dish;
  dishIds: string[];
  prev: string;
  next: string;
  rform: FormGroup;
  cmm: Comment;
  Dishes: Dish[];
  errmsg: string;
  dishcopy: Dish;
  visibility = 'shown';





  constructor(private fb: FormBuilder, private dishservice: DishService, private route: ActivatedRoute, private location: Location, @Inject('BaseURL') private BaseURL) {
    this.createform();
  }

  formerrors = {
    'author': '',
    'rating': 5,
    'comment': ''
  };
  validationmessages = {
    'author': {
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
      author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      comment: ['', Validators.required],
      rating: [5]
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
    this.cmm.date = new Date().toISOString();
    console.log(this.cmm);
    this.mydish.comments.push(this.cmm);
    this.dishservice.putdish(this.dishcopy).subscribe(dish => { this.mydish = dish; this.dishcopy = dish }, emsg => { this.mydish = null; this.dishcopy = null; this.errmsg = <any>emsg })
    console.log(this.cmm);
    this.rform.reset(
      {
        author: '',
        rating: 5,
        comment: ''
      }
    );

  }


  ngOnInit(): void {



    this.dishservice.getdishids().subscribe(dishids => this.dishIds = dishids);
    this.route.params.pipe(switchMap((params: Params) => { this.visibility = 'hidden'; return this.dishservice.getdish(params['id']); })).subscribe(dish => { this.mydish = dish; this.dishcopy = dish; this.setprevnext(dish.id); this.visibility = 'shown' }, emsg => this.errmsg = emsg);
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
