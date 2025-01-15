import BookCard from "./BookCard";
import { Book } from "../../js/bookListData"; 


interface BookCardListProps {
    filteredBooks: Book[];
}

const BookCardList: React.FC<BookCardListProps> = ({ filteredBooks }) => {

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center">
            {filteredBooks.map((book, index) => (
                <BookCard key={index} {...book} />
            ))}
        </div>
    );
};

export default BookCardList;
