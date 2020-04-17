import * as bodyParser from 'body-parser';
import * as helmet from "helmet";
import * as cors from "cors";
import * as dotenv from "dotenv";
import loggerMiddleware from './middlewares/logger';
import App from './app';
import AppRoute from './routes';

dotenv.config();

const app = new App({
    controllers: AppRoute,
    middlewares: [
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true }),
        loggerMiddleware,
        cors({
            origin: process.env.CORS_FILTER
        }),
        helmet()
    ]
})

app.listen();

export default app