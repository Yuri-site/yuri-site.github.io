import { useEffect, useState } from "react";
import { useBookTabStore } from "../../store/booksTab";
import BookCardList from "./BookCardList";
import BookListTable from "./BookListTable";
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
    const currentSeason = useBookTabStore((state) => state.currentSeason);
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [tabData, setTabData] = useState<Tab[]>([]);

    // fetch tabData
    useEffect(() => {
        fetch("https://yuri-site.github.io/data/booksTab.json")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                setTabData(data);
            })
            .catch((error) => console.error("Error fetching tab data:", error));
    }, []);

    // decide which data_link to fetch depends on currentSeason
    const selectedTab = tabData.find((tab) => tab.title === currentSeason);
    const dataLink = selectedTab ? selectedTab.data_link : "";

    // get book data depends on dataLink
    useEffect(() => {
        if (!dataLink) return;

        // fetch data
        setLoading(true);
        fetch(dataLink)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                setBooks(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching books data:", error);
                setLoading(false);
            });
    }, [dataLink]);

    //  filterBooks by text
    const filteredBooks = books.filter((book) =>
        Object.values(book).some((value) =>
            value.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

    if (loading) {
        return <div>Loading...</div>;
    }

    // Grid or List
    if (viewMode === "grid") {
        return <BookCardList filteredBooks={filteredBooks} />;
    }

    return <BookListTable filteredBooks={filteredBooks} />;
};

export default BookList;