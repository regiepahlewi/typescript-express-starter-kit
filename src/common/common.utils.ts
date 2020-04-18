import * as moment from 'moment';
import { IRequestValidator } from "../interface/request";
import { Response } from 'express';
import { StringConstants } from '../constants/string.constants';
import { IPagination } from '../interface/pagination';

export function responseJson(res: Response, data: any, statusCode?: number) {
    res.status(statusCode || 200)
    res.json({ data: data })
}

export function responseForPagination(res: Response, data: IPagination){
    res.status(200)
    res.json(data)
}

export function responseException(res: Response, err: any, msg?: any) {
    console.log(process.env.DEBUG_ON);
    const data = (process.env.DEBUG_ON == "true") ? { data: msg || StringConstants.MSG_ERROR_500, error: err } : { data: StringConstants.MSG_ERROR_500 }
    if(process.env.DEBUG_ON == "false"){
        console.error('EXCEPTION : ', err)
    }
    res.status(500)
    res.json(data)
}

export function validateRequest(body: any, field: IRequestValidator[]) {

    const res = [];

    for (let i = 0; i < field.length; i++) {
        if (field[i].validation === 'required') {
            if (body[field[i].name] === '' ||
                !body[field[i].name]) {
                res.push(field[i].name + ' is required')
            }
        } else if (field[i].validation === 'regex') {
            const regex = new RegExp(field[i].regex);
            const data: string = body[field[i].name]
            if (!regex.test(data)) {
                res.push(field[i].name + ' is invalid format')
            }
        } else {
            return;
        }
    }

    return res;
}

export function convertToNull(body: any, field: string[]): any {
    for (const data of field) {
        if (body[data] === '') {
            body[data] = null
        }
    }
    return body
}

export function dateFormat(body: any, field: string[], format?: string): any {
    for (const data of field) {
        if (body[data] !== '' && body[data]) {
            body[data] = dateFormater(body[data], format);
        } else {
            body[data] = null;
        }
    }
    return body;
}

export function dateFormater(date: string, format?: string) {
    let dateConvert = Date.parse(date);
    const dateFormat = (format) ? format : process.env.DATE_FORMAT;
    const momentFormat = moment(dateConvert).format(dateFormat);
    return momentFormat;
}
