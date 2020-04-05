import { IResponse } from "../interface/response";
import { IRequestValidator } from "../interface/request";
import * as moment from 'moment';

export class BaseController {

    private DATE_FORMAT: string = 'YYYY-MM-DD';

    commonResponse(status: number, data: any, err?: any): IResponse {
        const dataResponse = {
            data: data,
            error: err
        }
        const res = {
            status: status,
            data: dataResponse
        }
        return res;
    }

    validateRequest(body: any, field: IRequestValidator[]) {

        const res = [];
        const message = [];

        for (let i = 0; i < field.length; i++) {
            if (field[i].validation === 'required') {
                if (Object.values(body)[Object.keys(body).findIndex(val => val === field[i].name)] === '' ||
                    !Object.values(body)[Object.keys(body).findIndex(val => val === field[i].name)]) {
                    res.push(field[i].name + ' is required')
                }
            } else if (field[i].validation === 'regex') {

            } else {
                return;
            }
        }

        return res;
    }

    convertToNull(body: any, field: string[]): any {
        for (const data of field) {
            if (body[data] === '') {
                body[data] = null
            }
        }
        return body
    }

    dateFormat(body: any, field: string[], format?: string): any {
        for (const data of field) {
            body[data] = this.dateFormater(body[data], format)
        }
        return body;
    }

    private dateFormater(date: string, format?: string) {
        let dateConvert = Date.parse(date);
        const dateFormat = (format) ? format : this.DATE_FORMAT;
        const momentFormat = moment(dateConvert).format(dateFormat);
        return momentFormat;
    }
}