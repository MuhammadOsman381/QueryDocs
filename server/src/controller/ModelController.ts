import { Response, Request } from "express"
import { ApiResponse } from "../services/ApiResponseHandler";
import { DeleteFile, ReadPdfFile } from "../services/FileHandler";
import fs, { PathOrFileDescriptor } from "fs"
import { TrainAndAsk } from "../services/GeminiModelHandler";

const TrainModel = async (req: Request, res: Response) => {
    try {
        const { query } = req.body;
        const file = (req as any).files[0];
        const data = await ReadPdfFile(file.path as PathOrFileDescriptor)
        const response = await TrainAndAsk(data, query);
        ApiResponse(res, true, 200, "Response from AI get succesfully!", response);
        DeleteFile(file.filename)
    } catch (error) {
        console.log(error)
        ApiResponse(res, false, 500, "There is something wrong!");
    }
}

export { TrainModel }