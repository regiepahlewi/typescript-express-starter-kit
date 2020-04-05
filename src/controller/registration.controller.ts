import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { BaseController } from "./base.controller";
import { IController } from "../interface/controller";
import { IResponse } from "../interface/response";
import { StringConstants } from "../constants/string.constants";
import { IRequestValidator } from "../interface/request";
import { Registration } from "../entity/registration";

export class RegistrationController extends BaseController implements IController {

    res: IResponse;
    validator: IRequestValidator[];

    private userRepository = getRepository(Registration);

    async all(request: Request, response: Response, next: NextFunction) {
        const data = await this.userRepository.find();
        this.res = this.commonResponse(200, data);
        return this.res;
    }

    async save(request: Request, response: Response, next: NextFunction) {
        try {
            this.validator = [
                { name: 'firstName', validation: 'required' },
                { name: 'lastName', validation: 'required' },
                { name: 'email', validation: 'required' },
                { name: 'mobileNumber', validation: 'required' },
            ]

            const validate = this.validateRequest(request.body, this.validator);
            request.body = this.convertToNull(request.body, ['dob']);

            if (validate.length > 0) {
                this.res = this.commonResponse(400, validate);
            } else {
                const save = await this.userRepository.save(request.body);
                if (save) {
                    this.res = this.commonResponse(201, StringConstants.MSG_SUCCESS_INSERT);
                }
            }
            return this.res;
        } catch (err) {
            console.log(err.sqlMessage);
            return this.res = this.commonResponse(500, StringConstants.MSG_ERROR_500, err.sqlMessage);
        }

    }

}