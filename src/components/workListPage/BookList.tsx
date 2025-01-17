import React from "react";
import BookCardList from "./BookCardList"; // 假設這是已經存在的組件
import BookListTable from "./BookListTable"; // 引入新組件
// books data imported here, assuming it's defined somewhere
import { books } from "../../data/bookListData"; 

interface BookListProps {
    viewMode: "grid" | "list";
    searchQuery: string; // 新增搜尋參數
}

const BookList: React.FC<BookListProps> = ({ viewMode, searchQuery }) => {
    // 根據搜尋文字過濾書籍資料
    const filteredBooks = books.filter((book) =>
        Object.values(book).some((value) =>
            value.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

    // 顯示 Grid 或 List 視圖
    if (viewMode === "grid") {
        return <BookCardList filteredBooks={filteredBooks} />;
    }

    return <BookListTable filteredBooks={filteredBooks} />;
};

export default BookList;
