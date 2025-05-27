import axios from "axios";
import { checkAdmin } from "../utils/checkPermission";

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

export const fetchLogsByTarget = async (
    targetType: string,
    targetId: string
    ): Promise<LogEntry[]> => {
    const res = await axios.get<LogEntry[]>(`${API_BASE}/${targetType}/${targetId}`);
    return res.data;
};

export const restoreLog = async (logId: string): Promise<void> => {
    checkAdmin();
    await axios.post(`${API_BASE}/restore/${logId}`);
};

export const fetchAllLogs = async (): Promise<LogEntry[]> => {
    checkAdmin();
    const res = await axios.get<LogEntry[]>(API_BASE);
    return res.data;
};
