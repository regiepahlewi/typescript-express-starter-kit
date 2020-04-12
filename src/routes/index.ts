import { Router } from "express";
import registration from "./registration";

const routes = Router();

routes.use("/registration", registration);

export default routes;