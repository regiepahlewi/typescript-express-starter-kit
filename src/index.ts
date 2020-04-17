import App from './app';
import * as bodyParser from 'body-parser';
import * as helmet from "helmet";
import * as cors from "cors";
import loggerMiddleware from './middlewares/logger';
import AppRoute from './routes';

const app = new App({
    controllers: AppRoute,
    middlewares: [
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true }),
        loggerMiddleware,
        cors(),
        helmet()
    ]
})

app.listen();

export default app