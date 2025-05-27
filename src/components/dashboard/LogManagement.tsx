import { useEffect, useState } from "react";
import { fetchAllLogs, restoreLog, LogEntry } from "../../api/log";
import LogTable from "./LogManagement/LogTable";
import LogDetailModal from "./LogManagement/LogDetailModal";

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
        <h2 className="text-2xl font-bold mb-6 text-black">操作歷史紀錄</h2>

        {loading ? (
            <p>載入中...</p>
        ) : logs.length === 0 ? (
            <p className="text-gray-500">沒有歷史紀錄</p>
        ) : (
            <LogTable logs={logs} onView={setSelectedLog} onRestore={handleRestore} />
        )}

        {selectedLog && <LogDetailModal log={selectedLog} onClose={() => setSelectedLog(null)} />}
        </div>
    );
};

export default LogManagement;
