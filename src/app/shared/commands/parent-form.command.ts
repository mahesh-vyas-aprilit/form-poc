import { FormControl, FormGroup } from '@angular/forms';
import { GenericCommand, IGenericCommand } from './generic-form.command';
export interface IParentForm
  extends FormGroup<{
    personalInfo: FormControl<IGenericCommand | null>;
    clientInfo: FormControl<IGenericCommand | null>;
  }> {}
export interface IParentCommand {
  personalInfo: IGenericCommand;
  clientInfo:IGenericCommand
}
export class ParentCommand {
  static fromForm(form: IParentForm): IParentCommand {
    const command: IParentCommand = {
      personalInfo: form.value.personalInfo!,
      clientInfo: form.value.clientInfo!,
    };
    return command;
  }
  constructor() {}
}
