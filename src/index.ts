import "reflect-metadata";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import loggerMiddleware from "./middleware/logger";
import connectionMiddleware from "./middleware/connection";
import routes from "./routes";

// create express app
const app = express();

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





