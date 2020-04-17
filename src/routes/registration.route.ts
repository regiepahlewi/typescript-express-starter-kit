import * as express from 'express'
import { RegistrationController } from '../controllers/registration.controller'

class RegistrationRoute {

    public router = express.Router()

    constructor(
        private registrationController = new RegistrationController()
    ) {
        this.router.get('/registration', this.registrationController.all)
        this.router.post('/registration', this.registrationController.save)
    }

}

export default RegistrationRoute