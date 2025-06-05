import { useState } from "react";
import { login } from "../api/auth";

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleLogin = async (): Promise<void> => {
        try {
            const data = await login(username, password);
            localStorage.setItem("authToken", data.token);
            window.location.href = "/#/dashboard";
        } catch (error) {
            console.error("Login failed:", error);
            alert("Login failed. Please check your credentials.");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-3xl font-bold text-center text-slate-600 mb-6">
                    百合坂管理系統
                </h2>
                <div className="mb-4">
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                </div>
                <div className="mb-6">
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                </div>
                <div className="flex justify-center">
                    <button
                        onClick={handleLogin}
                        className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition"
                    >
                        登入
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
