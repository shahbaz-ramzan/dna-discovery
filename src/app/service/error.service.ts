import {Injectable} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Injectable({
    providedIn: 'root'
})
export class ErrorService {

    constructor() {
    }

    required(form: FormGroup, field: string): boolean {
        return (form.get(field)?.errors?.required && form.get(field)?.touched)
    }

    maxLength(form: FormGroup, field: string): boolean {
        return (form.get(field)?.errors?.maxlength && form.get(field)?.touched)
    }

    minLength(form: FormGroup, field: string): boolean {
        return (form.get(field)?.errors?.minlength && form.get(field)?.touched)
    }

    pattern(form: FormGroup, field: string): boolean {
        return (form.get(field)?.errors?.pattern && form.get(field)?.touched)
    }

}
