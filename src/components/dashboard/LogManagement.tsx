import { useEffect, useState } from "react";
import { fetchAllLogs, restoreLog, LogEntry } from "../../api/log";

const LogManagement = () => {
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedLog, setSelectedLog] = useState<LogEntry | null>(null);

    const loadLogs = async () => {
        setLoading(true);
        try {
        const res = await fetchAllLogs();
        setLogs(res);
        } catch (err) {
        console.error("載入 log 錯誤:", err);
        } finally {
        setLoading(false);
        }
    };

    const handleRestore = async (logId: string) => {
        if (!confirm("確定要還原此操作？")) return;
        try {
        await restoreLog(logId);
        alert("還原成功！");
        await loadLogs();
        } catch (err) {
        console.error("還原失敗:", err);
        alert("還原失敗");
        }
    };

    useEffect(() => {
        loadLogs();
    }, []);

    return (
        <div className="p-6">
        <h2 className="text-xl font-bold mb-4">📘 操作歷史紀錄</h2>

        {loading ? (
            <p>載入中...</p>
        ) : logs.length === 0 ? (
            <p className="text-gray-500">沒有歷史紀錄</p>
        ) : (
            <table className="w-full border text-sm">
            <thead>
                <tr className="bg-gray-100 text-center">
                <th className="border p-2">時間</th>
                <th className="border p-2">使用者</th>
                <th className="border p-2">資料類型</th>
                <th className="border p-2">操作</th>
                <th className="border p-2">操作目標</th>
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
                    <button
                        className="text-blue-500 hover:underline"
                        onClick={() => setSelectedLog(log)}
                    >
                        查看
                    </button>
                    </td>
                    <td className="border p-2">
                    {log.beforeData && (
                        <button
                        className="text-red-500 hover:underline"
                        onClick={() => handleRestore(log._id)}
                        >
                        還原
                        </button>
                    )}
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        )}

        {selectedLog && (
            <div className="mt-6 p-4 border bg-gray-50 rounded">
            <h3 className="font-semibold mb-2">操作詳細內容</h3>
            <p className="text-sm text-gray-700 mb-2">
                <strong>操作時間：</strong> {new Date(selectedLog.timestamp).toLocaleString()}
                <br />
                <strong>操作者：</strong> {selectedLog.userId?.username}
                <br />
                <strong>操作類型：</strong> {selectedLog.actionType}
                <br />
                <strong>資料類型：</strong> {selectedLog.targetType}
                <br />
                <strong>資料 ID：</strong> {selectedLog.targetId}
            </p>

            <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                <h4 className="font-bold text-red-500">Before</h4>
                <pre className="bg-red-100 p-2 rounded overflow-x-auto">
                    {JSON.stringify(selectedLog.beforeData, null, 2)}
                </pre>
                </div>
                <div>
                <h4 className="font-bold text-green-500">After</h4>
                <pre className="bg-green-100 p-2 rounded overflow-x-auto">
                    {JSON.stringify(selectedLog.afterData, null, 2)}
                </pre>
                </div>
            </div>

            <button
                className="mt-4 text-blue-600 hover:underline"
                onClick={() => setSelectedLog(null)}
            >
                關閉
            </button>
            </div>
        )}
        </div>
    );
};

export default LogManagement;
