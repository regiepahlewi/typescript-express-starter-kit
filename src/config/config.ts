import * as dotenv from "dotenv";
export class Config {

    private static getCommonEnvironment() {
        dotenv.config();

        const config = {
            DATE_FORMAT: process.env.DATE_FORMAT,
            JWT_SECRET: process.env.JWT_SECRET
        }

        return config
    }

    // Date Format
    static DATE_FORMAT = Config.getCommonEnvironment().DATE_FORMAT;

    // JWT
    static JWT_SECRET = Config.getCommonEnvironment().JWT_SECRET;
};