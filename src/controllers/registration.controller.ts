import { NextFunction, Request, Response } from "express";
import { StringConstants } from "../constants/string.constants";
import { getRegistrationRepository } from "../repository/registration.repository";
import { commonResponse, validateRequest, dateFormat } from "../common/common.utils";
import { IRequestValidator } from "../interface/request";

export class RegistrationController {

    async all(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await getRegistrationRepository().find();
            res.json(commonResponse(200, data))
        } catch (err) {
            res.json(commonResponse(500,StringConstants.MSG_ERROR_500))
        }
    }

    async save(req: Request, res: Response, next: NextFunction) {
        try {

            const validator: IRequestValidator[] = [
                { name: 'firstName', validation: 'required' },
                { name: 'lastName', validation: 'required' },
                { name: 'email', validation: 'required' },
                { name: 'email', validation: 'regex', regex: StringConstants.REGEX_EMAIL },
                { name: 'mobileNumber', validation: 'required' },
                { name: 'mobileNumber', validation: 'regex', regex: StringConstants.REGEX_PHONE_NUMBER_INA },
            ]

            const validate = validateRequest(req.body, validator);
            req.body = dateFormat(req.body, ['dob']);

            if (validate.length > 0) {
                res.json(commonResponse(400, validate));
            } else {
                const checkMobileNumber = await getRegistrationRepository().count({ mobileNumber: req.body.mobileNumber });
                const checkEmail = await getRegistrationRepository().count({ email: req.body.email });

                if (checkMobileNumber > 0) {
                    const message = StringConstants.MSG_MOBILE_NUMBER_ALREADY_TAKEN + ' : ' + req.body.mobileNumber;
                    res.json(commonResponse(400, message));
                } else if (checkEmail > 0) {
                    const message = StringConstants.MSG_EMAIL_ALREADY_TAKEN + ' : ' + req.body.email;
                    res.json(commonResponse(400, message));
                } else {
                    await getRegistrationRepository().save(req.body);
                    res.json(commonResponse(201, StringConstants.MSG_SUCCESS_INSERT));
                }
            }
        } catch (err) {
            res.json(commonResponse(500, StringConstants.MSG_ERROR_500, err.sqlMessage));
        }

    }

}