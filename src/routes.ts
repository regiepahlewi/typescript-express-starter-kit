import { RegistrationController } from "./controller/registration.controller";

export const Routes = [
    {
        method: "get",
        route: "/registration",
        controller: RegistrationController,
        action: "all"
    },
    {
        method: "post",
        route: "/registration",
        controller: RegistrationController,
        action: "save"
    }
];