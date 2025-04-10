import { Book } from "../../types";
import { useBookStore } from "../../store/book";
import BookCard from "./BookCard";
import BookDetailCard from "./BookDetailCard";

interface BookCardListProps {
    filteredBooks: Book[];
    colTabs: { key: keyof Book; label: string }[];
}

const BookCardList: React.FC<BookCardListProps> = ({ filteredBooks, colTabs }) => {
    const { selectedBook, setSelectedBook } = useBookStore();

    const handleCardClick = (book: Book) => {
        setSelectedBook(book);
    };

    const closeDetailModal = () => {
        setSelectedBook(null);
    };

    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center">
                {filteredBooks.map((book, index) => (
                    <BookCard
                        key={index}
                        {...book}
                        onClick={handleCardClick}
                    />
                ))}
            </div>

            {/* Show the detail modal if a book is selected */}
            {selectedBook && <BookDetailCard selectedBook={selectedBook} closeDetailModal={closeDetailModal} colTabs={colTabs}/>}
        </div>
    );
};

export default BookCardList;
