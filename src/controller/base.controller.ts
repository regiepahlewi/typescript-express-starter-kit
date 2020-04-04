import { IResponse } from "../interface/response";
import { IRequestValidator } from "../interface/request";

export class BaseController {

    commonResponse(status: number, data: any): IResponse {
        const dataResponse = {
            data: data
        }
        const res = {
            status: status,
            data: dataResponse
        }
        return res;
    }

    validateRequest(body: any, field: IRequestValidator[]) {

        const res = [];

        for (let i = 0; i < field.length; i++) {
            if (field[i].validation === 'required') {
                if (Object.values(body)[Object.keys(body).findIndex(val => val === field[i].name)] === '' ||
                    !Object.values(body)[Object.keys(body).findIndex(val => val === field[i].name)]) {
                    res.push(field[i].name + ' is required')
                }
            }
        }

        return res;
    }
}