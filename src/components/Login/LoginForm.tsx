import React, { useState } from "react";
import { useAuthStore } from "../../store/authStore";

const LoginForm: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const setAuth = useAuthStore((state) => state.setAuth);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();
            if (response.ok) {
                // 假設 data.user 是從後端回傳的 user 資料
                setAuth(data.token, data.user);
            } else {
                setError(data.message || "登入失敗");
            }
        } catch (err) {
            console.error(err);
            setError("系統錯誤，請稍後再試");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto p-4 bg-white shadow-md rounded">
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="用戶名"
                required
                className="w-full p-2 border rounded"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="密碼"
                required
                className="w-full p-2 border rounded"
            />
            {error && <div className="text-red-500">{error}</div>}
            <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
                登入
            </button>
        </form>
    );
};

export default LoginForm;
