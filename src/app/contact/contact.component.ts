import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback, Contacttype } from '../shared/feedback';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})

export class ContactComponent implements OnInit {

  @ViewChild('fform') fbformdirective;
  feedbackform: FormGroup;
  feedback: Feedback;
  contact = Contacttype;
  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit(): void {
  }
  createForm() {
    this.feedbackform = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      telnum: [0, Validators.required],
      email: ['', Validators.required],
      agree: false,
      contact: 'None',
      message: ''
    });
  }
  onsubmit() {
    this.feedback = this.feedbackform.value;
    console.log(this.feedback);
    this.feedbackform.reset(
      {
        firstname: '',
        lastname: '',
        telnum: 0,
        email: '',
        agree: false,
        contact: 'None',
        message: ''
      }
    );
    this.fbformdirective.resetForm();
  }

}
