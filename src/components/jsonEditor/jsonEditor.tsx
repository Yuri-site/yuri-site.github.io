import React, { useState } from "react";

interface JsonObject {
    [key: string]: string | number | boolean | null; // define dataType
}

const JsonEditor: React.FC = () => {
    const [jsonData, setJsonData] = useState<JsonObject[]>([
        { name: "Alice", age: 25, job: "Developer" },
        { name: "Bob", age: 30, job: "Designer" },
    ]);
    const [jsonOutput, setJsonOutput] = useState<string>("");

    // new row
    const addRow = () => {
        const newRow = Object.keys(jsonData[0] || {}).reduce(
            (acc, key) => ({ ...acc, [key]: "" }),
            {}
        );
        setJsonData([...jsonData, newRow]);
    };

    // delete row
    const deleteRow = (rowIndex: number) => {
        setJsonData(jsonData.filter((_, index) => index !== rowIndex));
    };

    // update value
    const handleValueChange = (rowIndex: number, key: string, value: string) => {
        const updatedData = [...jsonData];
        updatedData[rowIndex] = { ...updatedData[rowIndex], [key]: value };
        setJsonData(updatedData);
    };

    // add col
    const addColumn = () => {
        const newColumnName = prompt("請輸入新的欄位名稱") || "";
        if (newColumnName) {
            const updatedData = jsonData.map((row) => ({
                ...row,
                [newColumnName]: "",
            }));
            setJsonData(updatedData);
        }
    };

    // gen json
    const generateJson = () => {
        setJsonOutput(JSON.stringify(jsonData, null, 4));
    };

    return (
        <div className="p-4">
            <h1 className="text-lg font-bold mb-4">JSON 檔案編輯器</h1>

            {/* JSON edit */}
            {jsonData.length > 0 && (
                <table className="table-auto border-collapse border border-gray-300 w-full mb-4">
                    <thead>
                        <tr>
                            {Object.keys(jsonData[0]).map((key) => (
                                <th
                                    key={key}
                                    className="border border-gray-300 px-4 py-2 bg-gray-200"
                                >
                                    {key}
                                </th>
                            ))}
                            <th className="border border-gray-300 px-4 py-2 bg-gray-200">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {jsonData.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {Object.keys(row).map((key) => (
                                    <td
                                        key={key}
                                        className="border border-gray-300 px-4 py-2"
                                    >
                                        <input
                                            type="text"
                                            value={row[key] as string}
                                            className="w-full border border-gray-300 p-1"
                                            onChange={(e) =>
                                                handleValueChange(
                                                    rowIndex,
                                                    key,
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </td>
                                ))}
                                <td className="border border-gray-300 px-4 py-2">
                                    <button
                                        className="bg-red-500 text-white px-2 py-1 rounded"
                                        onClick={() => deleteRow(rowIndex)}
                                    >
                                        刪除
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {/* action btn */}
            <button
                className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                onClick={addRow}
            >
                新增列
            </button>
            <button
                className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                onClick={addColumn}
            >
                新增欄位
            </button>
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={generateJson}
            >
                生成 JSON
            </button>

            {/* JSON output */}
            {jsonOutput && (
                <div className="mt-4">
                    <h2 className="text-lg font-bold mb-2">生成的 JSON</h2>
                    <pre className="bg-gray-100 p-4 border border-gray-300 rounded">
                        {jsonOutput}
                    </pre>
                </div>
            )}
        </div>
    );
};

export default JsonEditor;
