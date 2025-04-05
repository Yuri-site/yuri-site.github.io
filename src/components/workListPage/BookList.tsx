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

    // Fetch tabData from the backend
    useEffect(() => {
        const loadTabs = async () => {
            try {
                const tabs = await fetchBookTabs(); // Requesting bookTabs
                setTabData(tabs); // Assuming 'tabs' is an array of Tab objects
            } catch (err) {
                setError("載入分類失敗");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        loadTabs();
    }, []);

    // Get the selected tab based on currentSeason
    const selectedTab = tabData.find((tab) => tab.title === currentSeason);

    // Fetch books based on selected tab
    useEffect(() => {
        if (!selectedTab || !selectedTab._id) return; // Check if _id is defined

        setLoading(true);

        // Fetch books using the selected tab's _id
        fetchBooksByTab(selectedTab._id)
            .then((data) => {
                // Filter books based on the selectedTab's col_tabs
                const filteredBooks = data.filter((book: Book) =>
                    selectedTab.col_tabs.some((col) => book[col.key])
                );
                setBooks(filteredBooks);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching books data:", error);
                setLoading(false);
            });
    }, [selectedTab]);

    // Helper function to filter books based on the search query
    const filterBooks = (books: Book[], query: string): Book[] => {
        if (!query) return books; // If no query, return all books

        const lowerCaseQuery = query.toLowerCase();

        return books.filter((book) =>
            Object.values(book).some((value) =>
                value && value.toString().toLowerCase().includes(lowerCaseQuery)
            )
        );
    };

    // Apply filtering
    const filteredBooks = filterBooks(books, searchQuery);

    if (loading) {
        return <div>Loading...</div>;
    }

    // Grid or List view
    if (viewMode === "grid") {
        return <BookCardList filteredBooks={filteredBooks} />;
    }

    return <BookListTable filteredBooks={filteredBooks} colTabs={selectedTab?.col_tabs || []} />;
};

export default BookList;
