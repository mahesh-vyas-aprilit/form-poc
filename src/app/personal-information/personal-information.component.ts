import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  forwardRef,
  inject,
} from '@angular/core';
import {
  AbstractControl,
  ControlContainer,
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  ValidationErrors,
  Validator,
  Validators,
} from '@angular/forms';
import { phoneRegex } from '../../config/regex';
import {
  IGenericCommand,
  IGenericForm,
} from '../shared/commands/generic-form.command';
import { debounce, debounceTime, map } from 'rxjs';

@Component({
  selector: 'app-personal-information',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './personal-information.component.html',
  styleUrl: './personal-information.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PersonalInformationComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: PersonalInformationComponent,
    },
  ],
})
export class PersonalInformationComponent
  implements OnInit, OnDestroy, ControlValueAccessor, Validator
{
  @Input() label = '';

  parentFormGroup!: IGenericForm;
  value: IGenericCommand | null = null;
  touched = false;
  onTouched = () => {};
  onChange = (val: IGenericCommand | null) => {};
  constructor(private fb: FormBuilder) {}
  ngOnDestroy(): void {}
  writeValue(obj: IGenericCommand | null): void {
    this.parentFormGroup.patchValue({
      email: obj?.email,
      name: obj?.name,
      phone: obj?.phone,
    });
    this.value = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
    this.parentFormGroup.valueChanges
      .pipe(debounceTime(300), )
      .subscribe((val) => {
        this.onChange({ name: val.name ?? '', email: val.email ?? '', phone: val.phone ?? '' })
      });
  }
  registerOnTouched(fn: any): void {
    this.touched = true;
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.parentFormGroup.disable();
    } else {
      this.parentFormGroup.enable();
    }
  }
  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    // return this.parentFormGroup.errors;
    return null;
  }
  registerOnValidatorChange?(fn: () => void): void {

  }

  ngOnInit() {
    this.parentFormGroup = this.fb.nonNullable.group({
      name: this.fb.nonNullable.control<string>('', Validators.required),
      email: this.fb.nonNullable.control<string>('', [
        Validators.required,
        Validators.email,
      ]),
      phone: this.fb.nonNullable.control<string>('', [
        Validators.required,
        Validators.pattern(phoneRegex),
      ]),
    });

  }
}
