import * as express from 'express'
import * as dotenv from "dotenv";
import { Application } from 'express'
import { createConnection, Connection } from "typeorm";
import Entities from './entity';

class App {
    public app: Application;
    public port: string;

    constructor(appInit: { middlewares: any; controllers: any; }) {
        this.app = express();
        this.connectPort();
        this.middlewares(appInit.middlewares);

        this.connectToDatabase().then(data => {
            this.routes(appInit.controllers);
        });
    }

    private middlewares(middleWares: { forEach: (arg0: (middleWare: any) => void) => void; }) {
        middleWares.forEach(middleWare => {
            this.app.use(middleWare)
        })
    }

    private routes(controllers: { forEach: (arg0: (controller: any) => void) => void; }) {
        controllers.forEach(controller => {
            this.app.use(process.env.BASE_ENDPONINT, controller.router)
        })
    }

    private async connectToDatabase() {
        try {
            const connection = await createConnection({
                type: 'mariadb',
                host: (process.env.PRODUCTION == 'true') ? process.env.DATABASE_PROD_HOST : process.env.DATABASE_HOST,
                port: (process.env.PRODUCTION == 'true') ? parseInt(process.env.DATABASE_PROD_PROD): parseInt(process.env.DATABASE_PORT),
                database: (process.env.PRODUCTION == 'true') ? process.env.DATABASE_PROD_NAME : process.env.DATABASE_NAME,
                username: (process.env.PRODUCTION == 'true') ? process.env.DATABASE_PROD_USERNAME : process.env.DATABASE_USERNAME,
                password: (process.env.PRODUCTION == 'true') ? process.env.DATABASE_PROD_PASSWORD : process.env.DATABASE_PASSWORD,
                synchronize: (process.env.DATABASE_SYNCHRONIZE == 'true') ? true : false,
                logging: (process.env.DATABASE_LOGGING == 'true') ? true : false,
                entities: Entities,
                migrations: [],
                subscribers: [],
                cli: {
                    entitiesDir: 'src/entity',
                    migrationsDir: 'src/migration',
                    subscribersDir: 'src/subscriber'
                }
            });
            if (connection) {
                console.log('INFO : Database has been connected successfully.')
            }
        } catch (err) {
            console.log('EXCEPTION : ',err);
        }
    }

    private connectPort() {
        dotenv.config();
        this.port = process.env.PORT;
    }

    listen(): void {
        this.app.listen(this.port, () => {
            const appMode = (process.env.PRODUCTION == 'false') ? 'development' : 'production'
            console.log(`App listening on the http://localhost:${this.port} with ${appMode} mode`)
        })
    }
}

export default App