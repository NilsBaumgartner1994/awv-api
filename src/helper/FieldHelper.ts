'use strict';

/**
 * FieldHelper class
 *
 * @class FieldHelper
 */
export default class FieldHelper {

    static isNotEmptyString(string: any){
        return !!string && string.length > 0;
    }

    static hasNotEmptyStringFields(object: any, ...fields: string[]){
        for(let field of fields){
            let value: any = object[field];
            if(!FieldHelper.isNotEmptyString(value)){
                return false;
            }
        }
        return true;
    }

}
