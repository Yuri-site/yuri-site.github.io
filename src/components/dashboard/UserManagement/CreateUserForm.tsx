import React from "react";
import { NewUserInput } from "../../../types";

interface Props {
    newUser: NewUserInput;
    setNewUser: React.Dispatch<React.SetStateAction<NewUserInput>>;
    onSubmit: () => void;
}

const CreateUserForm: React.FC<Props> = ({ newUser, setNewUser, onSubmit }) => {
    const permissionLabels: { [key in keyof NewUserInput["permissions"]]: string } = {
        book: "書籍",
        bookTab: "書籍分類",
        article: "文章",
        carousel: "輪播圖",
    };

    const handlePermissionChange = (key: keyof NewUserInput["permissions"], checked: boolean) => {
        setNewUser({
        ...newUser,
        permissions: {
            ...newUser.permissions,
            [key]: checked,
        },
        });
    };

    return (
        <div className="mb-6 border p-4 rounded-md bg-gray-50">
            <div className="grid grid-cols-2 gap-4 mb-2">
                <input
                    type="text"
                    placeholder="帳號名稱"
                    value={newUser.username}
                    onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                    className="border p-2 rounded-md"
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    className="border p-2 rounded-md"
                />
                <input
                    type="password"
                    placeholder="密碼"
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    className="border p-2 rounded-md"
                />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 text-base mb-4">
                {/* 最高管理者 */}
                <div
                    onClick={() =>
                        setNewUser((prev: NewUserInput) => ({ ...prev, isAdmin: !prev.isAdmin }))
                    }
                    className={`px-4 py-2 border rounded-md text-center cursor-pointer transition
                    ${newUser.isAdmin ? "bg-blue-600 text-white border-blue-600" : "border-gray-300 text-gray-700 bg-blue-100 hover:bg-blue-200"}
                    `}
                >
                    最高管理者
                </div>

                {/* 權限選擇 */}
                {Object.entries(permissionLabels).map(([key, label]) => {
                    const isSelected = newUser.permissions[key as keyof typeof permissionLabels];
                    return (
                    <div
                        key={key}
                        onClick={() =>
                        handlePermissionChange(key as keyof typeof permissionLabels, !isSelected)
                        }
                        className={`px-4 py-2 border rounded-md text-center cursor-pointer transition
                        ${isSelected ? "bg-blue-500 text-white border-blue-500" : "border-gray-300 text-gray-700  bg-blue-100 hover:bg-blue-200"}
                        `}
                    >
                        {label}
                    </div>
                    );
                })}
            </div>

            <button
                onClick={onSubmit}
                    className="mt-4 px-6 py-2 bg-blue-600 text-white text-base font-semibold rounded hover:bg-blue-700 transition"
                >
                建立使用者
            </button>



        </div>
    );
};

export default CreateUserForm;
