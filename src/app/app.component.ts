import { Component } from '@angular/core';
import {
  AbstractControl,
  AbstractControlOptions,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
} from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  userError: any;
  message: string = '';
  options: AbstractControlOptions = {
    validators: this.checkIfMatchingPassword,
  };
  myForm = this.fb.group(
    {
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
    },
    this.options
  );

  // The following syntax is also supported
  // myForm = new FormGroup({
  //   firstName: new FormControl(''),
  //   lastName: new FormControl(''),
  //   email: new FormControl(''),
  //   password: new FormControl(''),
  //   confirmPassword: new FormControl(''),
  // });

  constructor(private fb: FormBuilder) {}

  checkIfMatchingPassword(form: AbstractControl): ValidationErrors | null {
    if (form.get('password')?.value != form.get('confirmPassword')?.value) {
      return {
        notEqualToPassword: true,
      };
    }
    return null;
  }

  onSubmit(value: FormGroup) {
    console.log(value.value);
  }
}
