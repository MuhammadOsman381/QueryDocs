import { useRef, useState } from "react";
import NavBar from "../components/NavBar";
import { FaUpload } from "react-icons/fa";
import toast from "react-hot-toast";
import usePostAndPut from "../hooks/usePostAndPut";
import axios from "axios";
import { wrapIntoFormData } from "../services/FormHandling";
import { ValidateData } from "../services/DataValidator";
import { IoSend } from "react-icons/io5";
import SpinnerLoader from "../components/SpinLoader";

interface Message {
    sender: "user" | "bot";
    text: string;
}

const UserLayout = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<File | null>(null);
    const [showChatInterface, setShowChatInterface] = useState<boolean>(false);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const post = usePostAndPut(axios.post);


    function removeEmptyStrings(array: string[]) {
        return array.filter(item => item !== "");
    }

    async function formatResponse(text: string) {
        const paragraphs = text.trim().split('\n\n');
        let formattedText = '';
        console.log(paragraphs)
        paragraphs.forEach((item: string) => {
            if (item.trim().startsWith("**") && item.trim().endsWith("**")) {
                formattedText += `<strong class="text-xl text-gray-800">${item.trim().slice(2, -2)}</strong>`;
            } else if (item.trim().startsWith("*")) {
                const listItemsArray = item.trim().split("\n");
                formattedText += "<ul>";
                listItemsArray.forEach((listItem) => {
                    let formattedListItem = listItem.trim().slice(1).trim();
                    if (formattedListItem.trim().startsWith("**")) {
                        removeEmptyStrings(formattedListItem.trim().split("**")).map((items, index) => {
                            if (index === 0) {
                                formattedText += `<strong class="text-gray-700">${items.trim()}</strong>`;
                            } else {
                                formattedText += `<li>${index}${items.trim()}</li>`;
                            }
                        });
                    } else {
                        formattedText += `<li>_${formattedListItem.trim()}</li>`;
                    }
                });
                formattedText += "</ul>";
            } else {
                formattedText += `<p>${item.trim()}</p>`;
            }
        });

        return formattedText;
    }



    const handleSend = async () => {
        if (!ValidateData([input])) return;
        const userMessage: Message = { sender: "user", text: input.trim() };
        setMessages((prev) => [...prev, userMessage]);
        const formData = wrapIntoFormData({
            file: file,
            query: input.trim(),
        });
        const response = await post.callApi("model/train-and-ask", formData, true, true, false);
        const formattedText = await formatResponse(response.data.data)
        const botMessage: Message = { sender: "bot", text: formattedText };
        setMessages((prev) => [...prev, botMessage]);
        setInput("");
    };

    const handleIconClick = () => {
        fileInputRef.current?.click();
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files ? e.target.files[0] : null;
        if (selectedFile) {
            setFile(selectedFile);
        } else {
            toast.error("File not selected");
        }
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!ValidateData([file])) return;
        const formData = wrapIntoFormData({
            file: file,
            query: "",
        });
        const response = await post.callApi("model/train-and-ask", formData, true, true, false);
        if (response.data?.data) {
            const formattedText = await formatResponse(response.data.data)
            setMessages([{ sender: "bot", text: formattedText }]);
        }
        setShowChatInterface(true);
    };




    return (
        <div>
            <NavBar />
            <div className="flex h-[93vh] items-start justify-center bg-white p-10">
                {showChatInterface ? (
                    <div className="flex flex-col h-[87vh] w-full mx-auto border rounded-2xl border-gray-300">
                        <div className="flex-1 p-4 overflow-y-auto bg-gray-50 rounded-2xl">
                            {messages.map((msg, index) => (
                                <div
                                    key={index}
                                    className={`my-2 ${msg.sender === "user" ? "text-right" : "text-left"}`}
                                >
                                    <div
                                        dangerouslySetInnerHTML={{ __html: msg.text }}
                                        className={`inline-block px-4 py-2 rounded-lg overflow-auto w-full ${msg.sender === "user" ? "bg-black text-white" : "bg-gray-200"
                                            }`}
                                    >
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex order-t border-gray-300 p-4">
                            <input
                                type="text"
                                placeholder="Type your message..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                className="w-full outline-none px-4 py-2 border-none rounded-lg focus:outline-none"
                            />
                            <button
                                onClick={handleSend}
                                className="ml-4 px-4 py-2 bg-black text-white rounded-lg hover:bg-blue-600"
                            >
                                {
                                    post.loading ?
                                        <SpinnerLoader color="white" size="7"/>
                                        :
                                        <IoSend />
                                }
                            </button>
                        </div>
                    </div>
                ) : (
                    <form
                        onSubmit={handleSubmit}
                        className="border border-gray-300 bg-gray-50 rounded-2xl p-5 w-full flex flex-col items-start gap-2"
                    >
                        <div className="bg-white font-thin text-gray-900 border border-gray-300 rounded-xl py-2 px-3">
                            {file ? (
                                <span onClick={handleIconClick}>{file.name}</span>
                            ) : (
                                <span className="flex items-center gap-2" onClick={handleIconClick}>
                                    Select your file <FaUpload />
                                </span>
                            )}
                            <input
                                type="file"
                                accept="*"
                                ref={fileInputRef}
                                onChange={handleImageChange}
                                className="hidden"
                            />
                        </div>
                        <button className="bg-black font-semibold text-white rounded-xl py-2 px-3">
                            Start Chat
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default UserLayout;
