import { Response, Request } from "express"
import { ApiResponse } from "../services/ApiResponseHandler";
import { DeleteFile, ReadPdfFile } from "../services/FileHandler";
import fs, { PathOrFileDescriptor } from "fs"
import pdfParse from "pdf-parse"

const TrainModel = async (req: Request, res: Response) => {
    try {
        const file = (req as any).files[0];
        const data = await ReadPdfFile(file.path as any);
        console.log(data.trim())
        ApiResponse(res, true, 200, "Working fine!");
        DeleteFile(file.filename)
    } catch (error) {
        ApiResponse(res, false, 500, "There is something wrong!",);
    }
}

export { TrainModel }