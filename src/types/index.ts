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
}
