import { useEffect, useState } from "react";
import { User } from "../../types";
import { useAuthStore } from "../../store/authStore";

import CreateUserForm from "./UserManagement/CreateUserForm";
import UserTable from "./UserManagement/UserTable";
import EditUserModal from "./UserManagement/EditUserModal";

import {
    fetchUsers,
    createUser as apiCreateUser,
    updateUserPermissions,
    updateUserInfo,
    deleteUser as apiDeleteUser,
} from "../../api/user";

const UserManagement = () => {
    const currentUser = useAuthStore((state) => state.user);
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [newUser, setNewUser] = useState({
        username: "",
        email: "",
        password: "",
        isAdmin: false,
        canManageBooks: false,
        canManageArticles: false,
        canManageSlides: false,
    });

    const [editingUser, setEditingUser] = useState<User | null>(null);

    useEffect(() => {
        if (currentUser?.isAdmin) {
        loadUsers();
        }
    }, [currentUser]);

    const loadUsers = async () => {
        try {
        const data = await fetchUsers();
        setUsers(data);
        } catch (error) {
        console.error("載入使用者失敗:", error);
        } finally {
        setLoading(false);
        }
    };

    const handleCreateUser = async () => {
        try {
        const created = await apiCreateUser(newUser);
        setUsers((prev) => [...prev, created]);
        setNewUser({
            username: "",
            email: "",
            password: "",
            isAdmin: false,
            canManageBooks: false,
            canManageArticles: false,
            canManageSlides: false,
        });
        alert("✅ 使用者建立成功！");
        } catch (error) {
        console.error("建立失敗:", error);
        alert("❌ 使用者建立失敗！");
        }
    };

    const handleUpdatePermissions = async (userId: string, updates: Partial<User>) => {
        try {
        const updated = await updateUserPermissions(userId, updates);
        setUsers((prev) => prev.map((u) => (u._id === userId ? updated : u)));
        } catch (error) {
        console.error("更新權限失敗:", error);
        alert("❌ 權限更新失敗！");
        }
    };

    const handleUpdateUser = async (userId: string, updates: { username: string; email: string }) => {
        try {
        const updated = await updateUserInfo(userId, updates);
        setUsers((prev) => prev.map((u) => (u._id === userId ? updated : u)));
        } catch (error) {
        console.error("更新資料失敗:", error);
        alert("❌ 使用者資料更新失敗！");
        }
    };

    const handleDeleteUser = async (userId: string) => {
        if (!confirm("確定要刪除此使用者嗎？")) return;
        try {
        await apiDeleteUser(userId);
        setUsers((prev) => prev.filter((u) => u._id !== userId));
        alert("✅ 使用者已刪除");
        } catch (error) {
        console.error("刪除使用者失敗:", error);
        alert("❌ 無法刪除使用者");
        }
    };

    if (!currentUser?.isAdmin) {
        return <div className="text-red-500 font-semibold">你沒有管理者權限</div>;
    }

    if (loading) return <p>載入中...</p>;

    return (
        <div className="p-6">
        <CreateUserForm newUser={newUser} setNewUser={setNewUser} onSubmit={handleCreateUser} />

        <h2 className="text-xl font-bold mb-4">使用者權限管理</h2>

        <UserTable
            users={users}
            onPermissionChange={handleUpdatePermissions}
            onEdit={setEditingUser}
            onDelete={handleDeleteUser}
        />

        <EditUserModal
            user={editingUser}
            onClose={() => setEditingUser(null)}
            onSave={handleUpdateUser}
        />
        </div>
    );
};

export default UserManagement;
