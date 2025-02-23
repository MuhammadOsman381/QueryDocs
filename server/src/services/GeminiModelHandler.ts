import { GoogleGenerativeAI } from '@google/generative-ai';

const TrainAndAsk = async (data: string, query: string) => {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(`Read the text carefully I will ask you questions from this and send response Ask whatever you want! when query is empty:\n\n
        data:${data}\n\n
        query:${query}`);
    return result.response.text();
};

export { TrainAndAsk }