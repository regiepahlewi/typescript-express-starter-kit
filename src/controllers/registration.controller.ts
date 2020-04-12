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

    private registrationRepository = getRepository(Registration);

    async all(request: Request, response: Response, next: NextFunction) {
        try {
            const data = await this.registrationRepository.find();
            this.res = this.commonResponse(200, data);
            return this.res;
        } catch (err) {
            return this.res = this.commonResponse(500, StringConstants.MSG_ERROR_500);
        }
    }

    async save(request: Request, response: Response, next: NextFunction) {
        try {
            this.validator = [
                { name: 'firstName', validation: 'required' },
                { name: 'lastName', validation: 'required' },
                { name: 'email', validation: 'required' },
                { name: 'email', validation: 'regex', regex: StringConstants.REGEX_EMAIL },
                { name: 'mobileNumber', validation: 'required' },
                { name: 'mobileNumber', validation: 'regex', regex: StringConstants.REGEX_PHONE_NUMBER_INA },
            ]

            const validate = this.validateRequest(request.body, this.validator);
            request.body = this.dateFormat(request.body, ['dob']);

            if (validate.length > 0) {
                this.res = this.commonResponse(400, validate);
            } else {
                const checkMobileNumber = await this.registrationRepository.count({ mobileNumber: request.body.mobileNumber });
                const checkEmail = await this.registrationRepository.count({ email: request.body.email });

                if (checkMobileNumber > 0) {
                    const message = StringConstants.MSG_MOBILE_NUMBER_ALREADY_TAKEN + ' : ' + request.body.mobileNumber;
                    this.res = this.commonResponse(400, message);
                } else if (checkEmail > 0) {
                    const message = StringConstants.MSG_EMAIL_ALREADY_TAKEN + ' : ' + request.body.email;
                    this.res = this.commonResponse(400, message);
                } else {
                    await this.registrationRepository.save(request.body);
                    this.res = this.commonResponse(201, StringConstants.MSG_SUCCESS_INSERT);
                }
            }
            return this.res;
        } catch (err) {
            return this.res = this.commonResponse(500, StringConstants.MSG_ERROR_500, err.sqlMessage);
        }

    }

}