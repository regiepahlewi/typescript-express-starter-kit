import { Router } from "express"
import { RegistrationController } from "../controllers/registration.controller";

const router = Router();
const registrationController = new RegistrationController();

router.get("/", registrationController.all);
router.post("/", registrationController.save);

export default router;