import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
} from '@angular/forms';
import { AddressComponent } from './address/address.component';
import { PersonalInformationComponent } from './personal-information/personal-information.component';
import { IGenericCommand } from './shared/commands/generic-form.command';
import { IParentForm } from './shared/commands/parent-form.command';

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
  form!: IParentForm;
  submitted = false;
  constructor(private fb: FormBuilder){}
  ngOnInit(): void {
    this.form = this.fb.nonNullable.group({
      personalInfo: this.fb.nonNullable.control<IGenericCommand | null>(null),
      clientInfo: this.fb.nonNullable.control<IGenericCommand | null>(null),
    }, {validators: this.validateForm});
  }

  validateForm(form: AbstractControl): ValidationErrors | null{
    if (!form.value.personalInfo || !form.value.clientInfo) {
      return null;
    }
    if (form.value.personalInfo && form.value.clientInfo) {
      if (form.value.personalInfo.name === form.value.clientInfo.name) {
        return {nameEqual: true}
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  handleSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      console.log(this.form.value);

    //  const interestsArray = this.form.get('interests') as FormArray;
      // while (interestsArray.length !== 0) {
      //   interestsArray.removeAt(0);
      // }
      // [''].forEach(() => interestsArray.push(new FormControl('')));

      this.form.reset();
      this.form.markAsUntouched();
      this.form.markAsPristine();
      this.submitted = false;
    } else {
      console.log('form is not valid');
    }
  }
}
