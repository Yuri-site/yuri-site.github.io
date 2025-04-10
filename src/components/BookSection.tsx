import PropTypes from "prop-types";

interface BookSectionProps {
    title: string;
    items: string[];
}

const BookSection: React.FC<BookSectionProps> = ({ title, items }) => {
    return (
        <div className="w-full md:w-1/2 px-4 mb-8">
            <h2 className="text-lg font-bold bg-pink-300 text-white py-2 px-4 rounded-t-md">
                {title}
            </h2>
            <div className="bg-gray-200 p-4 rounded-b-md space-y-2">
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="h-16 bg-gray-300 rounded-lg"
                    >
                        {item}
                    </div>
                ))}
            </div>
        </div>
    );
};

BookSection.propTypes = {
    title: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

export default BookSection;
