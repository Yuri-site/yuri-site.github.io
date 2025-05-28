import React, { useEffect, useState } from "react";
import { LogEntry } from "../../../api/log";
import { fetchBookTabById } from "../../../api/bookTab";

interface Props {
    log: LogEntry;
    onClose: () => void;
}

const formatValue = (value: unknown): string => {
    return typeof value === "object" ? JSON.stringify(value, null, 2) : String(value);
};

const getChangedKeys = (
    before: Record<string, unknown> = {},
    after: Record<string, unknown> = {}
): string[] => {
    const keys = new Set([...Object.keys(before), ...Object.keys(after)]);
    return Array.from(keys).filter((key) => {
        return formatValue(before[key]) !== formatValue(after[key]);
    });
};

const LogDetailModal: React.FC<Props> = ({ log, onClose }) => {
    const changedKeys = getChangedKeys(log.beforeData, log.afterData);
    const [tabNameMap, setTabNameMap] = useState<Record<string, string>>({});

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [onClose]);

    useEffect(() => {
        const ids = new Set<string>();
        const collectIds = (data?: Record<string, unknown>) => {
            if (data?.tabs && Array.isArray(data.tabs)) {
                data.tabs.forEach((id) => typeof id === "string" && ids.add(id));
            }
        };

        collectIds(log.beforeData);
        collectIds(log.afterData);

        const fetchNames = async () => {
            const entries = await Promise.all(
                Array.from(ids).map(async (id) => {
                    try {
                        const tab = await fetchBookTabById(id);
                        return [id, tab.title] as const;
                    } catch {
                        return [id, "未知分類"] as const;
                    }
                })
            );
            setTabNameMap(Object.fromEntries(entries));
        };

        fetchNames();
    }, [log]);

    const renderCell = (key: string, value: unknown, color: string) => {
        const isTabsField = key === "tabs" && Array.isArray(value);
        return (
            <td className={`px-4 p-2 break-all ${color}`}>
                {isTabsField ? (
                    <ul className="list-disc list-inside">
                        {(value as string[]).map((id) => (
                            <li key={id}>
                                {id}{" "}
                                <span className="text-gray-500">（{tabNameMap[id] || "載入中..."}）</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    formatValue(value)
                )}
            </td>
        );
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
                <h3 className="text-lg font-bold mb-3 text-gray-800">操作詳細內容</h3>
                <p className="text-md text-gray-700 mb-4 leading-relaxed">
                    <strong>操作時間：</strong> {new Date(log.timestamp).toLocaleString()}
                    <br />
                    <strong>操作者：</strong> {log.userId?.username}
                    <br />
                    <strong>操作類型：</strong> {log.actionType}
                    <br />
                    <strong>資料類型：</strong> {log.targetType}
                    <br />
                    <strong>資料 ID：</strong> {log.targetId}
                </p>

                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <h4 className="font-bold text-red-500 mb-2">更改前</h4>
                        <table className="w-full border text-left">
                            <tbody>
                                {Object.entries(log.beforeData || {}).map(([key, value]) => {
                                    const color = changedKeys.includes(key) ? "bg-red-100" : "";
                                    return (
                                        <tr key={key}>
                                            <td className={`px-4 p-2 font-medium ${color}`}>{key}</td>
                                            {renderCell(key, value, color)}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <h4 className="font-bold text-green-500 mb-2">更改後</h4>
                        <table className="w-full border text-left">
                            <tbody>
                                {Object.entries(log.afterData || {}).map(([key, value]) => {
                                    const color = changedKeys.includes(key) ? "bg-green-100" : "";
                                    return (
                                        <tr key={key}>
                                            <td className={`px-4 p-2 font-medium ${color}`}>{key}</td>
                                            {renderCell(key, value, color)}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="text-right mt-4">
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        onClick={onClose}
                    >
                        關閉
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LogDetailModal;
