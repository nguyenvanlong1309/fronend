import { AbstractControl, ValidationErrors } from "@angular/forms";
import { Utils } from "../utils";

export class CustomValidators {

    public static onlyText(control: AbstractControl): ValidationErrors | null {
        const value = control.value as string;
        if (!value) return null;
        const vn = Utils.toLowerCaseNonAccentVietnamese(value).replace(/\s*/g, '');
        if (/([0-9]|\W)+/.test(vn)) {
            return { pattern: true};
        }
        return null;
    }
}