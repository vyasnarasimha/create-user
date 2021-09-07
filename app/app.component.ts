import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// import custom validator to validate that password and confirm password fields match
import { MustMatch } from './_helpers/must-match.validator';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  users: any = [];
  createForm = true;
  editForm = false;
  updateForm: FormGroup;
  userDetails: any;
  //   users = [
  //     {
  //       name: 'Vyas',
  //       email: 'vyas@mail.com',
  //       phoneNumber: '1234567890',
  //       website: 'test.com'
  //     },
  //     {
  //       name: 'Charan',
  //       email: 'charan@mail.com',
  //       phoneNumber: '1234567890',
  //       website: ''
  //     },
  //     {
  //       name: 'sagar',
  //       email: 'sagar@mail.com',
  //       phoneNumber: '1234567890',
  //       website: 'mytest.cpm'
  //     }
  //   ];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phonenumber: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10)
        ]
      ],
      website: ['']
    });
    this.updateForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phonenumber: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10)
        ]
      ],
      website: ['']
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    // display form values on success
    // alert(
    //   'SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4)
    // );
    let userlist = {
      name: this.registerForm.value.name,
      email: this.registerForm.value.email,
      phoneNumber: this.registerForm.value.phonenumber,
      website: this.registerForm.value.website
    };
    this.users.push(userlist);
    this.onReset();
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }
  cancel() {
    this.editForm = false;
    this.createForm = true;
  }
  open(data) {
    this.createForm = false;
    this.editForm = true;
    this.userDetails = data;
    console.log(this.userDetails);
    this.updateForm.setValue({
      name: this.userDetails.name,
      email: this.userDetails.email,
      phonenumber: this.userDetails.phoneNumber,
      website: this.userDetails.website
    });
  }
  update() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.updateForm.invalid) {
      return;
    }
    this.users.map((d, i) => {
      console.log(this.users);
      if (d.name == this.updateForm.value.name) {
        return (this.users[i] = this.updateForm.value);
      }
    });
    this.editForm = false;
    this.createForm = true;
    this.onReset();
  }
}
