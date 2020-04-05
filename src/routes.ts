import { RegistrationController } from "./controller/registration.controller";

export const Routes = [
    {
        method: "post",
        route: "/registration",
        controller: RegistrationController,
        action: "save"
    }
];