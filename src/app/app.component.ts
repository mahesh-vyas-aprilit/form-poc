import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { AddressComponent } from './address/address.component';
import { PersonalInformationComponent } from './personal-information/personal-information.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    AddressComponent,
    PersonalInformationComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  ngOnInit(): void {
    this.form = new FormGroup({
      interests: new FormArray(
        [''].map((interest) => new FormControl(interest))
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

  handleSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      console.log(this.form.value);

      const interestsArray = this.form.get('interests') as FormArray;
      while (interestsArray.length !== 0) {
        interestsArray.removeAt(0);
      }
      [''].forEach(() => interestsArray.push(new FormControl('')));

      this.form.reset();
      this.form.markAsUntouched();
      this.form.markAsPristine();
      this.submitted = false;
    } else {
      console.log('form is not valid');
    }
  }
}
