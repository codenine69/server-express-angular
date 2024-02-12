import express, {Application} from 'express';
import routesProduct from '../routes/product';
import routesUser from '../routes/user';
import sequelize from '../db/connection';
import { product } from './product';
import { User } from './user';
import cors from 'cors';

class Server{
    private app: Application;
    private port: string | undefined;
    constructor(){
        this.app = express();
        this.port = process.env.PORT || '3001';
        this.listen();
        this.midlewares();
        this.routes();
        this.dbConnect();
       // console.log(process.env.PORT);
    }

    listen(){
        this.app.listen(this.port, ()=> {
            console.log('App corriendo en el puerto: '+ this.port);
        });
    }

    routes() {
        this.app.use('/api/products', routesProduct);
        this.app.use('/api/users', routesUser); // Agrega una barra diagonal antes de 'api/users'
    }

    midlewares(){
        this.app.use(express.json());
        // cors
        this.app.use(cors());
    }


    async dbConnect(){
        try{
           // await sequelize.authenticate();
           await product.sync()
           await User.sync()
            console.log('Connection has been stablished');
        }catch (error){
            console.error('unable to connect');
        }
    }
}

export default Server;