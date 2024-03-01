import { FormControl, FormGroup } from '@angular/forms';
export interface IGenericForm
  extends FormGroup<{
    name: FormControl<string>;
    email: FormControl<string>;
    phone: FormControl<string>;
  }> {}
export interface IGenericCommand {
  name: string;
  email: string;
  phone: string;
}
export class GenericCommand {
  static fromForm(form: IGenericForm): IGenericCommand {
    const command: IGenericCommand = {
      name: form.value.name!,
      email: form.value.email!,
      phone: form.value.phone!
    };
    return command;
  }
  constructor() {}
}
