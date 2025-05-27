import { useAuthStore } from "../store/authStore";
import { PermissionSet } from "../types";

export const checkPermission = (permissionKey: keyof PermissionSet) => {
    const user = useAuthStore.getState().user;

    if (!user || (!user.isAdmin && !user.permissions?.[permissionKey])) {
        throw new Error("你沒有權限執行此操作");
    }
};

export const checkAdmin = () => {
    const user = useAuthStore.getState().user;
    
    if (!user || !user?.isAdmin) {
        throw new Error("你沒有權限執行此操作");
    }
};
