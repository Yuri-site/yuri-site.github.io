import React, { useState } from "react";

interface FormData {
    date: string;
    title: string;
    author: string;
    publisher: string;
    status: string;
    type: string;
    imageUrl: string;
}

const JsonGenerator: React.FC = () => {
    const [bulkInput, setBulkInput] = useState<string>("");
    const [jsonOutput, setJsonOutput] = useState<FormData[]>([]);

    const handleBulkChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setBulkInput(e.target.value);
    };

    const handleGenerate = () => {
        const lines = bulkInput.split("\n");
        const parsedData: FormData[] = lines.map((line) => {
            const [date, title, author, publisher, type, status] = line.split("\t");
            return {
                date: date || "",
                title: title || "",
                author: author || "",
                publisher: publisher || "",
                status: status || "",
                type: type || "",
                imageUrl: ""
            };
        });
        setJsonOutput(parsedData);
    };

    const handleCopy = () => {
        if (jsonOutput.length > 0) {
            navigator.clipboard.writeText(JSON.stringify(jsonOutput, null, 4));
            alert("JSON 已複製到剪貼板！");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
            <h1 className="text-2xl font-bold mb-5">JSON 檔案生成工具</h1>
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-2xl">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bulkInput">
                    請貼上資料（以 Tab 分隔每列資訊）
                </label>
                <textarea
                    id="bulkInput"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-40"
                    value={bulkInput}
                    onChange={handleBulkChange}
                    placeholder="例如：\n2025/2/28\tIDOL×IDOL STORY! 偶像生存戰\t得能正太郎\t東立\t未完結"
                />
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4 w-full"
                    onClick={handleGenerate}
                >
                    生成 JSON
                </button>
            </div>

            {jsonOutput.length > 0 && (
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-2xl mt-4">
                    <h2 className="text-lg font-bold mb-4">生成的 JSON</h2>
                    <button
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4 w-full"
                        onClick={handleCopy}
                    >
                        複製 JSON 到剪貼板
                    </button>
                    <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
                        {JSON.stringify(jsonOutput, null, 4)}
                    </pre>
                </div>
            )}
        </div>
    );
};

export default JsonGenerator;
