import { createConnection, Connection } from "typeorm";

const connectionMiddleware = async () => {
    try {
        const connection: Connection = await createConnection();
        if(connection){
            console.log('INFO : database has been connected successfully.')
        }
    } catch(err){
        console.log(err);
    }
    
}

export default connectionMiddleware