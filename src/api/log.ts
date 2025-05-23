import axios from "axios";

const API_BASE = `${import.meta.env.VITE_API_URL}/api/v1/logs`;

export type ActionType = "create" | "update" | "delete";
export type LogData = Record<string, unknown>;

export interface LogEntry {
    _id: string;
    targetType: string;
    targetId: string;
    actionType: ActionType;
    userId: { username: string };
    beforeData?: LogData;
    afterData?: LogData;
    timestamp: string;
}

// ✅ 取得某個資料的 log
export const fetchLogsByTarget = async (
    targetType: string,
    targetId: string
    ): Promise<LogEntry[]> => {
    const res = await axios.get<LogEntry[]>(`${API_BASE}/${targetType}/${targetId}`);
    return res.data;
};

// ✅ 還原某筆 log
export const restoreLog = async (logId: string): Promise<void> => {
    await axios.post(`${API_BASE}/restore/${logId}`);
};

// ✅ 管理員取得全部 log
export const fetchAllLogs = async (): Promise<LogEntry[]> => {
    const res = await axios.get<LogEntry[]>(API_BASE);
    return res.data;
};
