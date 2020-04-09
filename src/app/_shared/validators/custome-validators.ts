import { AbstractControl, FormGroup } from '@angular/forms';

export class customValidators{
    static notBeforeToday(control : AbstractControl){
        let value = control.value as Date;
        if(value == null) return;
        let today = new Date;
        let todayMoins = new Date(
            today.getFullYear() - 18, 
            today.getMonth(),
            today.getDate()
            )
        if(todayMoins.getTime() > value.getTime()){
            return{ error: "Invalid Date"};
        }else{return null}
    }

    static compare( ...args : any){
        return(group: FormGroup) => {
            let first = group.get(args[0]);
            let second = group.get(args[1]);
            if(!first || !second) return;
            if(first.value != second.value) return { error: "Not match"}
        }
    }
}