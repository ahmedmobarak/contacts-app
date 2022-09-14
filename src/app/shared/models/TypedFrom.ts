import { FormControl } from "@angular/forms";

export interface TypedForm {
    firstName: FormControl<string>;
    lastName: FormControl<string>;
    email: FormControl<string>;
    phoneNumber: FormControl<number>;
  }