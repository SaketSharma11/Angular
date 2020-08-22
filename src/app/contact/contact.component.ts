import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback, Contacttype } from '../shared/feedback';
import { flyInOut, visibility } from '../animations/app.animation';
import { FeedbackService } from '../services/feedback.service';
import { baseURL } from '../shared/baseurl';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display:block;'
  },
  animations: [
    flyInOut(), visibility()
  ]
})

export class ContactComponent implements OnInit {

  @ViewChild('fform') fbformdirective;
  feedbackform: FormGroup;
  feedback: Feedback[];
  fbform: Feedback[];
  contact = Contacttype;
  cerrmsg: string;
  visibility = 'shown';


  constructor(private fb: FormBuilder, private fbackservice: FeedbackService, @Inject('BaseURL') private BaseURL) {
    this.createForm();
  }

  ngOnInit(): void {
  }
  formerrors = {
    'firstname': '',
    'lastname': '',
    'telnum': '',
    'email': ''
  };
  validationmessages = {
    'firstname': {
      'required': 'First Name is required',
      'minlength': 'First Name must be atleast 2 charater long',
      'maxlength': 'First Name cannot be more than 25 characters long'
    },
    'lastname': {
      'required': 'Last Name is required',
      'minlength': 'Last Name must be atleast 2 charater long',
      'maxlength': 'Last Name cannot be more than 25 characters long'
    },
    'email': {
      'required': 'Email is required',
      'email': 'Email not in valid format'
    },
    'telnum': {
      'required': 'Tel Number is required',
      'pattern': 'Tel Number must contain only numbers'
    },
  };
  createForm() {
    this.feedbackform = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      telnum: [0, [Validators.required, Validators.pattern]],
      email: ['', [Validators.required, Validators.email]],
      agree: false,
      contact: 'None',
      message: ''
    });
    this.feedbackform.valueChanges.subscribe(data => this.onvaluechanged(data));
    this.onvaluechanged();

  }
  onvaluechanged(data?: any) {
    if (!this.feedbackform) {
      return;
    }
    const form = this.feedbackform;
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

  onsubmit() {
    this.feedback = this.feedbackform.value;
    console.log(this.feedback);
    this.visibility = 'hidden';

    this.fbackservice.submitFeedback(this.feedback).subscribe(fbf => { this.fbform = fbf; }, emsg => this.cerrmsg = emsg);
    setTimeout(() => {                           //<<<---using ()=> syntax
      this.visibility = 'shown';
      this.fbform = null;
    }, 5000);
    console.log(this.fbform);
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
