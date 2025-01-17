import React from "react";
import { Book } from "../../data/bookListData";
import { useBookStore } from "../../store/book"; // Zustand store
import BookCard from "./BookCard"; // BookCard component
import BookDetailCard from "./BookDetailCard"; // BookDetail component to show modal

interface BookCardListProps {
    filteredBooks: Book[];
}

const BookCardList: React.FC<BookCardListProps> = ({ filteredBooks }) => {
    const { selectedBook, setSelectedBook } = useBookStore(); // Zustand state for selected book

    const handleCardClick = (book: Book) => {
        setSelectedBook(book); // Set the selected book when clicking a card
    };

    const closeDetailModal = () => {
        setSelectedBook(null); // Close the modal by setting selectedBook to null
    };

    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center">
                {filteredBooks.map((book, index) => (
                    <BookCard
                        key={index}
                        {...book} // Spread the book props to BookCard
                        onClick={handleCardClick} // Pass onClick prop
                    />
                ))}
            </div>

            {/* Show the detail modal if a book is selected */}
            {selectedBook && <BookDetailCard selectedBook={selectedBook} closeDetailModal={closeDetailModal} />}
        </div>
    );
};

export default BookCardList;
