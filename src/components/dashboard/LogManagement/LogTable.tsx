import React from "react";
import { LogEntry } from "../../../api/log";

interface Props {
    logs: LogEntry[];
    onView: (log: LogEntry) => void;
    onRestore: (logId: string) => void;
}

const LogTable: React.FC<Props> = ({ logs, onView, onRestore }) => (
    <table className="w-full border text-sm">
        <thead>
        <tr className="bg-gray-100 text-center font-medium">
            <th className="border p-2">時間</th>
            <th className="border p-2">使用者</th>
            <th className="border p-2">資料類型</th>
            <th className="border p-2">操作</th>
            <th className="border p-2">變動項目</th>
            <th className="border p-2">詳細</th>
            <th className="border p-2">還原</th>
        </tr>
        </thead>
        <tbody>
        {logs.map((log) => (
            <tr key={log._id} className="text-center">
            <td className="border p-2">{new Date(log.timestamp).toLocaleString()}</td>
            <td className="border p-2">{log.userId?.username || "未知"}</td>
            <td className="border p-2">{log.targetType}</td>
            <td className="border p-2">{log.actionType}</td>
            <td className="border p-2">
                {typeof log.afterData?.title === "string"
                ? log.afterData.title
                : typeof log.afterData?.name === "string"
                ? log.afterData.name
                : "-"}
            </td>
            <td className="border p-2">
                <button className="text-blue-500 hover:underline" onClick={() => onView(log)}>
                查看
                </button>
            </td>
            <td className="border p-2">
                {log.beforeData && (
                <button className="text-red-500 hover:underline" onClick={() => onRestore(log._id)}>
                    還原
                </button>
                )}
            </td>
            </tr>
        ))}
        </tbody>
    </table>
);

export default LogTable;
