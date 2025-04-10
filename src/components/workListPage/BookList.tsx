import { useEffect, useState } from "react";
import { useBookTabStore } from "../../store/booksTab";
import BookCardList from "./BookCardList";
import BookListTable from "./BookListTable";
import { fetchBooksByTab } from "../../api/book";
import { fetchBookTabs } from "../../api/bookTab";
import { Book, BookTab } from "../../types";

interface BookListProps {
    viewMode: "grid" | "list";
    searchQuery: string;
}

const BookList: React.FC<BookListProps> = ({ viewMode, searchQuery }) => {
    const currentSeason = useBookTabStore((state) => state.currentSeason);
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [tabData, setTabData] = useState<BookTab[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadTabs = async () => {
            try {
                const tabs = await fetchBookTabs();
                setTabData(tabs);
            } catch (err) {
                setError("載入分類失敗");
                console.error(err);
                console.log(error);
                
            } finally {
                setLoading(false);
            }
        };
        loadTabs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const selectedTab = Array.isArray(tabData) ?
                        tabData.find((tab) => tab.title === currentSeason)
                        : undefined;

    useEffect(() => {
        setBooks([]);
        
        if (!selectedTab || !selectedTab._id) return;

        setLoading(true);
        
        fetchBooksByTab(selectedTab._id)
            .then((data) => {
                const filteredBooks = data.filter((book: Book) =>
                    selectedTab.col_tabs.some((col) => book[col.key])
                );
                setBooks(filteredBooks);
            })
            .catch((error) => {
                console.error("Error fetching books data:", error);
                setBooks([]);
                setError(`無法獲取 ${selectedTab.title} 分類的書籍`);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [selectedTab]);

    const filterBooks = (books: Book[], query: string): Book[] => {
        if (!query) return books;

        const lowerCaseQuery = query.toLowerCase();

        return books.filter((book) =>
            Object.values(book).some((value) =>
                value && value.toString().toLowerCase().includes(lowerCaseQuery)
            )
        );
    };

    const filteredBooks = filterBooks(books, searchQuery);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (viewMode === "grid") {
        return <BookCardList filteredBooks={filteredBooks} colTabs={selectedTab?.col_tabs || []} />;
    }

    return <BookListTable filteredBooks={filteredBooks} colTabs={selectedTab?.col_tabs || []} />;
};

export default BookList;
