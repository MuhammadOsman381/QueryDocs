import express from "express"
import { TrainModel } from "../controller/ModelController";
import { uploadArray } from "../middleware/Multer";

const modelRouter = express.Router();

modelRouter.post("/train-and-ask", uploadArray, TrainModel)

export { modelRouter }