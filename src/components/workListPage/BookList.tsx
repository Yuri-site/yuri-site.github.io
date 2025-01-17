import { useEffect, useState } from "react";
import { useBookTabStore } from "../../store/booksTab";  // 引入 zustand store
import BookCardList from "./BookCardList"; // 假設這是已經存在的組件
import BookListTable from "./BookListTable"; // 引入新組件
import { Book } from "../../data/bookListData";

interface Tab {
    id: string;
    title: string;
    data_link: string;
}

interface BookListProps {
    viewMode: "grid" | "list";
    searchQuery: string;
}

const BookList: React.FC<BookListProps> = ({ viewMode, searchQuery }) => {
    const currentSeason = useBookTabStore((state) => state.currentSeason); // 從 zustand store 中取得 currentSeason
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [tabData, setTabData] = useState<Tab[]>([]); // 用來存儲 fetch 下來的 tabData

    // 先 fetch tabData
    useEffect(() => {
        fetch("https://yuri-site.github.io/data/booksTab.json")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                setTabData(data);  // 設置 tabData
            })
            .catch((error) => console.error("Error fetching tab data:", error));
    }, []);

    // 根據 currentSeason 決定要 fetch 哪個 data_link
    const selectedTab = tabData.find((tab) => tab.title === currentSeason);
    const dataLink = selectedTab ? selectedTab.data_link : ""; // 選擇對應的 data_link

    // 根據 dataLink 來獲取書籍資料
    useEffect(() => {
        if (!dataLink) return;

        // 進行資料 fetch
        setLoading(true); // 在 fetch 開始時顯示 loading
        fetch(dataLink)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                setBooks(data); // 設置書籍資料
                setLoading(false); // 完成後關閉 loading
            })
            .catch((error) => {
                console.error("Error fetching books data:", error);
                setLoading(false);
            });
    }, [dataLink]); // 當 dataLink 改變時重新 fetch 資料

    // 根據搜尋文字過濾書籍資料
    const filteredBooks = books.filter((book) =>
        Object.values(book).some((value) =>
            value.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

    if (loading) {
        return <div>Loading...</div>;
    }

    // 顯示 Grid 或 List 視圖
    if (viewMode === "grid") {
        return <BookCardList filteredBooks={filteredBooks} />;
    }

    return <BookListTable filteredBooks={filteredBooks} />;
};

export default BookList;