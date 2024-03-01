import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

interface IForm {
  personalInformation: {
    name: string;
    email: string;
    phone: string;
  };
  address: {
    streetAddress: string;
    city: string;
    state: string;
    zipCode: string;
  };
  interests: string[];
}

const initialFormData: IForm = {
  personalInformation: {
    name: '',
    email: '',
    phone: '',
  },
  address: {
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
  },
  interests: [''],
};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatInputModule],
  templateUrl: './temp.component.html',
})
export class TempComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  ngOnInit(): void {
    this.form = new FormGroup({
      // personalInformation: new FormGroup({
      //   name: new FormControl(null, Validators.required),
      //   email: new FormControl(null, [Validators.required, Validators.email]),
      //   phone: new FormControl(null, Validators.required),
      // }),
      // address: new FormGroup({
      //   streetAddress: new FormControl(null, Validators.required),
      //   city: new FormControl(null, Validators.required),
      //   state: new FormControl(null, Validators.required),
      //   zipCode: new FormControl(null, Validators.required),
      // }),
      // intrests: new FormArray([new FormControl(null)]),

      personalInformation: new FormGroup({
        name: new FormControl(
          initialFormData.personalInformation.name,
          Validators.required
        ),
        email: new FormControl(initialFormData.personalInformation.email, [
          Validators.required,
          Validators.email,
        ]),
        phone: new FormControl(
          initialFormData.personalInformation.phone,
          Validators.required
        ),
      }),
      address: new FormGroup({
        streetAddress: new FormControl(
          initialFormData.address.streetAddress,
          Validators.required
        ),
        city: new FormControl(
          initialFormData.address.city,
          Validators.required
        ),
        state: new FormControl(
          initialFormData.address.state,
          Validators.required
        ),
        zipCode: new FormControl(
          initialFormData.address.zipCode,
          Validators.required
        ),
      }),
      interests: new FormArray(
        initialFormData.interests.map((interest) => new FormControl(interest))
      ),
    });
  }

  addInterest() {
    (this.form.get('interests') as FormArray).push(new FormControl(''));
  }

  removeInterest(index: number) {
    (this.form.get('interests') as FormArray).removeAt(index);
  }

  getInterestControls() {
    return (this.form.get('interests') as FormArray).controls;
  }

  get nameInvalid() {
    const nameControl = this.form.get('personalInformation.name');
    return (
      (nameControl?.invalid && this.submitted) ||
      (nameControl?.touched && nameControl?.invalid)
    );
  }
  get emailInvalid() {
    const emailControl = this.form.get('personalInformation.email');
    return (
      (emailControl?.invalid && this.submitted) ||
      (emailControl?.touched && emailControl?.invalid)
    );
  }
  get phoneInvalid() {
    const phoneControl = this.form.get('personalInformation.phone');
    return (
      (phoneControl?.invalid && this.submitted) ||
      (phoneControl?.touched && phoneControl?.invalid)
    );
  }

  get streetAddressInvalid() {
    const streetAddressControl = this.form.get('address.streetAddress');
    return (
      (streetAddressControl?.invalid && this.submitted) ||
      (streetAddressControl?.touched && streetAddressControl?.invalid)
    );
  }
  get cityInvalid() {
    const cityControl = this.form.get('address.city');
    return (
      (cityControl?.invalid && this.submitted) ||
      (cityControl?.touched && cityControl?.invalid)
    );
  }
  get stateInvalid() {
    const stateControl = this.form.get('address.state');
    return (
      (stateControl?.invalid && this.submitted) ||
      (stateControl?.touched && stateControl?.invalid)
    );
  }
  get zipCodeInvalid() {
    const zipCodeControl = this.form.get('address.zipCode');
    return (
      (zipCodeControl?.invalid && this.submitted) ||
      (zipCodeControl?.touched && zipCodeControl?.invalid)
    );
  }

  handleSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      console.log(this.form.value);
      this.form.reset();
      this.form.markAsUntouched();
      this.form.markAsPristine();
      this.submitted = false;
    } else {
      console.log('form is not valid');
    }
  }
}
