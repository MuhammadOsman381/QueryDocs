import path from "path"
import fs, { PathOrFileDescriptor } from 'fs';
import { promisify } from 'util';
import pdfParse from 'pdf-parse';

const DeleteFile = async (file: string) => {
    const filepath = path.join(process.cwd(), "src", "public", "uploads", file)
    if (fs.existsSync(filepath)) {
        fs.unlink(filepath, (err) => {
            if (err) {
                return err
            }
            else {
                return "File deleted succesfully"
            }
        })
    }
    else {
        return "File does not exist"
    }
}



const readFileAsync = promisify(fs.readFile);

/**
 * @param path 
 * @returns
 */
const ReadPdfFile = async (path: PathOrFileDescriptor): Promise<any> => {
    try {
        const dataBuffer = await readFileAsync(path);
        const pdfData = await pdfParse(dataBuffer);
        return pdfData.text;
    } catch (error: any) {
        throw new Error(`Error processing PDF: ${error.message}`);
    }
};


export { DeleteFile, ReadPdfFile }