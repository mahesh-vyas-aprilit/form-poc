import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import {
  ControlContainer,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { zipCodeRegex } from '../../config/regex';

@Component({
  selector: 'app-address',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './address.component.html',
  styleUrl: './address.component.css',
  // magic
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true }), //using skip self to prevent circular dependecy issue.
    },
  ],
})
export class AddressComponent {
  @Input({ required: true }) controlKey = '';
  @Input() label = '';
  @Input() submitted = false;
  parentContainer = inject(ControlContainer);

  get parentFormGroup() {
    return this.parentContainer?.control as FormGroup;
  }

  get zipCodeInvalid() {
    const zipCodeControl = this.parentFormGroup.get(
      this.controlKey + '.zipCode'
    );
    return (
      zipCodeControl?.invalid &&
      (zipCodeControl.dirty || zipCodeControl.touched)
    );
  }

  get streetAddressInvalid() {
    const streetAddressControl = this.parentFormGroup.get(
      this.controlKey + '.streetAddress'
    );
    return (
      streetAddressControl?.invalid &&
      (streetAddressControl.dirty || streetAddressControl.touched)
    );
  }

  get cityInvalid() {
    const cityControl = this.parentFormGroup.get(this.controlKey + '.city');
    return cityControl?.invalid && (cityControl.dirty || cityControl.touched);
  }

  get stateInvalid() {
    const stateControl = this.parentFormGroup.get(this.controlKey + '.state');
    return (
      stateControl?.invalid && (stateControl.dirty || stateControl.touched)
    );
  }

  ngOnInit() {
    this.parentFormGroup.addControl(
      this.controlKey,
      new FormGroup({
        streetAddress: new FormControl('', Validators.required),
        city: new FormControl('', Validators.required),
        state: new FormControl('', Validators.required),
        zipCode: new FormControl('', [
          Validators.required,
          Validators.pattern(zipCodeRegex),
        ]),
      })
    );
  }

  ngOnDestroy() {
    this.parentFormGroup.removeControl(this.controlKey);
  }
}
