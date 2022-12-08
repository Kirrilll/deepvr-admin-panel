import { RuleObject } from "antd/lib/form";


const INVALID_PHONE_MESSAGE = 'Номер введен неправильно';
const INVALID_PROMOCODE_DEFAULT_MESSAGE = 'Промокод не активен';

export class ValidatorHelper {
    static isPhoneValid(value: string):boolean {
        const cutRegEx: RegExp = /^8|(\+7)/;
        const phone = value.trim().replace(cutRegEx, '');
        return phone.length == 10;
    }

    static phoneValidator(rule: RuleObject, value: string): Promise<any> {
        if(ValidatorHelper.isPhoneValid(value)) return Promise.resolve();
        return Promise.reject(INVALID_PHONE_MESSAGE);
    }


    static promocodeValidator(rule: RuleObject, value: string): Promise<any>{
        return Promise.resolve();
    }
}