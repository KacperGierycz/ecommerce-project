import { FormControl, ValidationErrors } from "@angular/forms";

export class Luv2ShopValidators {

    // whitespace validation
    static notOnlyWhitespaces(control: FormControl): ValidationErrors {

        // check if a string only has whitespace
        if((control.value != null) && (control.value.trim().length === 0)) {

            // invalid, return error object
            return {'notOnlyWhitespaces': true};

        }
        else{
            // valid return null
            return null;
        }

    }

}
