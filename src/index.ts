import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import { Request, Response } from "express";
import { Routes } from "./routes";
import loggerMiddleware from "./middleware/logger";

createConnection().then(async connection => {

    // create express app
    const app = express();
    app.use(cors());
    app.use(bodyParser.json());
    app.use(loggerMiddleware);

    // register express routes from defined application routes
    Routes.forEach(route => {
        (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next);
            if (result instanceof Promise) {
                result.then(result => {
                    if (result !== null && result !== undefined) {
                        res.status(result.status);
                        res.json(result.data);
                    } else {
                        undefined;
                    }
                });
            } else if (result !== null && result !== undefined) {
                console.log('here2');
                res.json(result);
            }
        });
    });

    // start express server
    app.listen(3000);
    
    console.log("Express server has started on port 3000.");

}).catch(error => console.log(error));
