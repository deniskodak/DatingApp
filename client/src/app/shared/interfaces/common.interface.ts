import { AbstractControl } from "@angular/forms";

export type FormValue<T extends AbstractControl> = T extends AbstractControl<infer TValue, any> ? TValue : never;
export type FormRawValue<T extends AbstractControl> = T extends AbstractControl<any, infer TRawValue> ? TRawValue : never;