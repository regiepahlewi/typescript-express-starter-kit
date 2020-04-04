import { IResponse } from "./response";
import { IRequestValidator } from "./request";

export interface IController {
    res: IResponse;
    validator: IRequestValidator[];
}