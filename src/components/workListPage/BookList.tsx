import React from "react";
import BookCardList from "./BookCardList"; // 假設這是已經存在的組件

interface BookListProps {
    viewMode: "grid" | "list";
}

const BookList: React.FC<BookListProps> = ({ viewMode }) => {
    if (viewMode === "grid") {
        return <BookCardList />;
    }

    return (
        <div className="mt-4">
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-pink-100">
                        <th className="border border-gray-300 px-4 py-2">日期</th>
                        <th className="border border-gray-300 px-4 py-2">書名</th>
                        <th className="border border-gray-300 px-4 py-2">作者</th>
                        <th className="border border-gray-300 px-4 py-2">類型</th>
                        <th className="border border-gray-300 px-4 py-2">出版社</th>
                        <th className="border border-gray-300 px-4 py-2">狀態</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="border border-gray-300 px-4 py-2">2025-02-06</td>
                        <td className="border border-gray-300 px-4 py-2">
                            我買下了我的戀語書會
                        </td>
                        <td className="border border-gray-300 px-4 py-2">羽田宇佐</td>
                        <td className="border border-gray-300 px-4 py-2">中文代理漫畫</td>
                        <td className="border border-gray-300 px-4 py-2">東立</td>
                        <td className="border border-gray-300 px-4 py-2">單行本</td>
                    </tr>
                    <tr>
                        <td className="border border-gray-300 px-4 py-2">2025-02-06</td>
                        <td className="border border-gray-300 px-4 py-2">
                            我不行不能戀愛！趕緊下台
                        </td>
                        <td className="border border-gray-300 px-4 py-2">みかみてれん</td>
                        <td className="border border-gray-300 px-4 py-2">中文代理小說</td>
                        <td className="border border-gray-300 px-4 py-2">台灣角川</td>
                        <td className="border border-gray-300 px-4 py-2">單行本</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default BookList;
