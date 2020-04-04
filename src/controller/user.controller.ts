import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/user";
import { BaseController } from "./base.controller";
import { IController } from "../interface/controller";
import { IResponse } from "../interface/response";
import { StringConstants } from "../constants/string.constants";
import { IRequestValidator } from "../interface/request";

export class UserController extends BaseController implements IController {

    res: IResponse;
    validator: IRequestValidator[];

    private userRepository = getRepository(User);

    async all(request: Request, response: Response, next: NextFunction) {
        const data = await this.userRepository.find();
        this.res = this.commonResponse(400, data);
        return this.res;
    }

    async save(request: Request, response: Response, next: NextFunction) {
        this.validator = [
            { name: 'firstName', validation: 'required' },
            { name: 'firstName', validation: 'max', value: 255 },
            { name: 'lastName', validation: 'required' }
        ]
        
        const validate = this.validateRequest(request.body, this.validator);

        if (validate.length > 0) {
            this.res = this.commonResponse(400, validate);
        } else {
            const save = await this.userRepository.save(request.body);
            if (save) {
                this.res = this.commonResponse(201, StringConstants.MSG_SUCCESS_INSERT);
            }
        }
        return this.res;
    }

}