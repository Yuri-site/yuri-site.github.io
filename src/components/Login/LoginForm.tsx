import React, { useState } from "react";
import { useAuthStore } from "../../store/authStore";

const LoginForm: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const setToken = useAuthStore((state) => state.setToken);

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
            setToken(data.token);
        } else {
            setError(data.message || "登入失敗");
        }
        } catch (err) {
        console.error(err);
        setError("系統錯誤，請稍後再試");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
        <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="用戶名"
            required
        />
        <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="密碼"
            required
        />
        {error && <div>{error}</div>}
        <button type="submit">登入</button>
        </form>
    );
};

export default LoginForm;
