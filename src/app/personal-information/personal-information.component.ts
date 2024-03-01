import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import {
  ControlContainer,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { phoneRegex } from '../../config/regex';

@Component({
  selector: 'app-personal-information',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './personal-information.component.html',
  styleUrl: './personal-information.component.css',
  // magic
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true }), //using skip self to prevent circular dependecy issue.
    },
  ],
})
export class PersonalInformationComponent {
  @Input({ required: true }) controlKey = '';
  @Input() label = '';
  @Input() submitted = false;
  parentContainer = inject(ControlContainer);

  get parentFormGroup() {
    return this.parentContainer?.control as FormGroup;
  }

  get nameInvalid() {
    const nameControl = this.parentFormGroup.get(this.controlKey + '.name');
    return nameControl?.invalid && (nameControl.dirty || nameControl.touched);
  }

  get emailInvalid() {
    const emailControl = this.parentFormGroup.get(this.controlKey + '.email');
    return (
      emailControl?.invalid && (emailControl.dirty || emailControl.touched)
    );
  }

  get phoneInvalid() {
    const phoneControl = this.parentFormGroup.get(this.controlKey + '.phone');
    return (
      phoneControl?.invalid && (phoneControl.dirty || phoneControl.touched)
    );
  }

  ngOnInit() {
    this.parentFormGroup.addControl(
      this.controlKey,
      new FormGroup({
        name: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        phone: new FormControl('', [
          Validators.required,
          Validators.pattern(phoneRegex),
        ]),
      })
    );
  }
}
