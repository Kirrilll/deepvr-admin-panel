import { RuleObject } from "antd/lib/form";


const INVALID_PHONE_MESSAGE = 'Номер введен неправильно';
const INVALID_PROMOCODE_DEFAULT_MESSAGE = 'Промокод не активен';

export class ValidatorHelper {
    static isPhoneValid(value: string):boolean {
        const regExp = /^[\+]?[0-9]?[0-9]{3}[0-9]{3}[0-9]{4}$/;
        return regExp.test(value);
    }

    static phoneValidator(rule: RuleObject, value: string): Promise<any> {
        if(ValidatorHelper.isPhoneValid(value)) return Promise.resolve();
        return Promise.reject(INVALID_PHONE_MESSAGE);
    }


    static promocodeValidator(rule: RuleObject, value: string): Promise<any>{
        return Promise.resolve();
    }
}