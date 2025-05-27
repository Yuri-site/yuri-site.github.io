export interface Book {
    _id?: string;
    date: string;
    title: string;
    author: string;
    type: string;
    publisher: string;
    status: string;
    comment: string;
    imageUrl?: string;
    tabs?: string[];
}

export interface BookTab {
    _id?: string;
    title: string;
    col_tabs: {
        key: keyof Book;
        label: string;
    }[];
    order: number;
}
export interface LoginResponse {
    token: string;
    user: User;
}


export interface PermissionSet {
    book: boolean;
    bookTab: boolean;
    article: boolean;
    carousel: boolean;
}

export interface User {
    _id: string;
    username: string;
    email: string;
    isAdmin: boolean;
    permissions: PermissionSet;
}

export interface NewUserInput {
    username: string;
    email: string;
    password: string;
    isAdmin: boolean;
    permissions: PermissionSet;
}

