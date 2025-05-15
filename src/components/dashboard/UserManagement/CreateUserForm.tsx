import React from "react";
import { NewUserInput } from "../../../types";

interface Props {
    newUser: NewUserInput;
    setNewUser: (user: NewUserInput) => void;
    onSubmit: () => void;
}

const CreateUserForm: React.FC<Props> = ({ newUser, setNewUser, onSubmit }) => {
    const permissionKeys: (keyof Pick<
        NewUserInput,
        "isAdmin" | "canManageBooks" | "canManageArticles" | "canManageSlides"
    >)[] = ["isAdmin", "canManageBooks", "canManageArticles", "canManageSlides"];

    return (
        <div className="mb-6 border p-4 rounded bg-gray-50">
        <h3 className="font-semibold mb-2">新增使用者</h3>
        <div className="grid grid-cols-2 gap-4 mb-2">
            <input
            type="text"
            placeholder="帳號名稱"
            value={newUser.username}
            onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
            className="border p-2"
            />
            <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            className="border p-2"
            />
            <input
            type="password"
            placeholder="密碼"
            value={newUser.password}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            className="border p-2"
            />
        </div>
        <div className="flex gap-4 text-sm">
            {permissionKeys.map((key) => (
            <label key={key}>
                <input
                type="checkbox"
                checked={newUser[key]}
                onChange={(e) =>
                    setNewUser({ ...newUser, [key]: e.target.checked })
                }
                />{" "}
                {key.replace("canManage", "").replace("is", "")}
            </label>
            ))}
        </div>
        <button
            onClick={onSubmit}
            className="mt-3 px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
            建立使用者
        </button>
        </div>
    );
};

export default CreateUserForm;
