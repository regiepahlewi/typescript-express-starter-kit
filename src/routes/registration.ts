import { Router } from "express"
import { RegistrationController } from "../controllers/registration.controller";
import { jwtMiddleware } from "../middlewares/jwt";

const router = Router();
const registrationController = new RegistrationController();

router.use("*",jwtMiddleware); // all endpoint must using token
router.get("/", registrationController.all);
router.post("/", registrationController.save);

export default router;