import express from 'express';
import { Response, Request } from "express"
import dotenv from 'dotenv';
import { modelRouter } from './router/ModelRouter';
import cors from "cors";

dotenv.config();
const app = express();
app.use(cors(
    { origin: "*" }
));
app.get('/', (req: Request, res: Response) => {
    res.send('Hello from server!');
});
app.use("/api/model", modelRouter)

export { app }