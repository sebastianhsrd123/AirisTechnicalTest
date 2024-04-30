import { Options } from "./interfaces/public.metadata";
import {Server} from "./main/server";
import { AppRoutes } from "./main/routes";
import dotenv from 'dotenv';

(()=>{main();}) ()

async function main() {

    require('dotenv').config();
    const port = process.env.PORT || 5000;

    const options:Options = {
        port: Number(port),
        routes: AppRoutes.routes
    }

    new Server(options).start();
}