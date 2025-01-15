import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

interface CarouselProps {
    images: string[];
    interval?: number; // Optional, default interval time in milliseconds
}

const Carousel: React.FC<CarouselProps> = ({ images, interval = 3000 }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const startX = useRef(0); // Starting X position of the drag
    const isDragging = useRef(false); // Flag to check if dragging is active

    // Auto carousel effect
    useEffect(() => {
        const timer = setInterval(() => {
            setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, interval);

        return () => clearInterval(timer);
    }, [images.length, interval]);

    const handleDotClick = (index: number) => {
        setActiveIndex(index);
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        isDragging.current = true;
        startX.current = e.clientX; // Record the starting position of the drag
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging.current) return;

        const moveX = e.clientX - startX.current;
        if (moveX > 50) {
            // Dragged right
            setActiveIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
            isDragging.current = false;
        } else if (moveX < -50) {
            // Dragged left
            setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
            isDragging.current = false;
        }
    };

    const handleMouseUp = () => {
        isDragging.current = false;
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        isDragging.current = true;
        startX.current = e.touches[0].clientX; // Record the starting position of the touch
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isDragging.current) return;

        const moveX = e.touches[0].clientX - startX.current;
        if (moveX > 50) {
            // Dragged right
            setActiveIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
            isDragging.current = false;
        } else if (moveX < -50) {
            // Dragged left
            setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
            isDragging.current = false;
        }
    };

    const handleTouchEnd = () => {
        isDragging.current = false;
    };

    return (
        <div
            className="relative w-full max-w-4xl mx-auto"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            {/* Image Display */}
            <div className="relative">
                <img
                    src={images[activeIndex]}
                    alt={`Slide ${activeIndex + 1}`}
                    className=" h-96 object-cover w-full"
                />
                <div className="absolute bottom-0 left-0 w-full bg-gray-800 bg-opacity-50 text-white text-center py-2">
                    新書資訊
                </div>
            </div>

            {/* Dots for Navigation */}
            <div className="flex justify-center mt-2 space-x-2">
                {images.map((_, index) => (
                    <button
                        key={index}
                        className={`w-3 h-3 rounded-full ${
                            index === activeIndex
                                ? "bg-black"
                                : "bg-gray-400"
                        }`}
                        onClick={() => handleDotClick(index)}
                    ></button>
                ))}
            </div>
        </div>
    );
};

Carousel.propTypes = {
    images: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    interval: PropTypes.number, // Validate that interval is a number
};

export default Carousel;
