import { UserController } from "./controller/user.controller";

export const Routes = [
    {
        method: "get",
        route: "/users",
        controller: UserController,
        action: "all"
    },{
        method: "post",
        route: "/users",
        controller: UserController,
        action: "save"
    }
];