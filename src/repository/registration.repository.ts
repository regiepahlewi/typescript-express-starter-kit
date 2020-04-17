import { getRepository } from "typeorm";
import { Registration } from "../entity/registration";

export function getRegistrationRepository() {
    return getRepository(Registration);
}