import { FormControl, AbstractControl, ValidationErrors, Validators } from '@angular/forms';  
    
export class SpaceValidator {  
    static cannotContainSpace(control: AbstractControl) : ValidationErrors | null {  
        if((control.value as string).indexOf(' ') >= 0){  
            return {cannotContainSpace: true}  
        }  
    
        return null;  
    }  
}  



export function removeSpaces(control: AbstractControl) {
    if (control && control.value && !control.value.replace(/\s/g, '').length) {
      control.setValue('');
    }
    return null;
  }
  

export function spaceValidator(replaceSpaces: boolean = true): (control: FormControl) => { [key: string]: any } | null {
  return function(control: FormControl): { [key: string]: any } | null {
    const value = control.value ? control.value.toString() : '';
    if (replaceSpaces) {
      control.setValue(value.replace(/\s/g, ''));
    } else if (value.includes(' ')) {
      return { 'invalidSpace': true };
    }
    return null;
  }
}


export function phoneNumberValidator(control: FormControl): { [key: string]: any } {
    // const phoneRegExp = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/;
    // const nriPhoneRegExp = /^\+(?:[0-9] ?){6,14}[0-9]$/;
  
    // [+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s/0-9]*

    // if (control.value) {
    //   const value = control.value.toString();
    //   if (value.match(phoneRegExp) || value.match(nriPhoneRegExp)) {
    //     return null;
    //   } else {
    //     return { 'invalidPhoneNumber': true };
    //   }
    // }
    // return null;
  
    
    const phoneRegExp = /[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s/0-9]*/;

    if (control.value) {
      const value = control.value.toString();
      if (value.match(phoneRegExp)) {
        return null;
      } else {
        return { 'invalidPhoneNumber': true };
      }
    }

    return null;
}