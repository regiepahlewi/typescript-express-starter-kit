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
        dotenv.config();
        controllers.forEach(controller => {
            this.app.use(process.env.BASE_ENDPONINT, controller.router)
        })
    }

    private async connectToDatabase() {
        try {
            dotenv.config();
            const connection = await createConnection({
                type: 'mariadb',
                host: process.env.DATABASE_HOST,
                port: parseInt(process.env.DATABASE_PORT),
                database: process.env.DATABASE_NAME,
                username: process.env.DATABASE_USERNAME,
                password: process.env.DATABASE_PASSWORD,
                synchronize: true,
                logging: false,
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
            console.log(err);
        }
    }

    private connectPort() {
        dotenv.config();
        this.port = process.env.PORT;
    }

    listen(): void {
        this.app.listen(this.port, () => {
            console.log(`App listening on the http://localhost:${this.port}`)
        })
    }
}

export default App