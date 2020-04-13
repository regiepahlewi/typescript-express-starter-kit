import "reflect-metadata";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as helmet from "helmet";
import * as cors from "cors";
import loggerMiddleware from "./middlewares/logger";
import connectionMiddleware from "./middlewares/connection";
import routes from "./routes";

// create express app
const app = express();

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(loggerMiddleware);

//create connection
connectionMiddleware();

//register routes
app.use('/',routes);

// start express server
app.listen(3000);
console.log("Express server has started on port 3000.");

export default app;





