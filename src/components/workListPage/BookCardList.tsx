import BookCard from "./BookCard";
import bookData from "../../js/bookCardData";

const BookCardList: React.FC = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center">
            {bookData.map((book, index) => (
                <BookCard key={index} {...book} />
            ))}
        </div>
    );
};

export default BookCardList;
