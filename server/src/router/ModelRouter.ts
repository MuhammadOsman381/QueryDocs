import express from "express"
import { TrainModel } from "../controller/FileController";
import { uploadArray } from "../middleware/Multer";

const modelRouter = express.Router();

modelRouter.post("/train-model", uploadArray, TrainModel)

export { modelRouter }