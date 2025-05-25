import axios from "axios";

// define
export interface CarouselItem {
    title: string;
    articleLink: string;
    images: string[];
}

const API_URL = "http://localhost:5000/api/v1/carousel";

// upload Carousel Item
export const uploadCarouselItem = async (data: CarouselItem): Promise<CarouselItem> => {
    try {
        const response = await axios.post<CarouselItem>(API_URL, data);
        return response.data;
    } catch (error) {
        console.error("Error uploading carousel item:", error);
        throw error;
    }
};


// get all Carousel
export const fetchCarouselItems = async (): Promise<CarouselItem[]> => {
    try {
        const response = await axios.get<CarouselItem[]>(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching carousel items:", error);
        throw error;
    }
};

// delete Carousel
export const deleteCarouselItem = async (id: string): Promise<void> => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        console.error("Error deleting carousel item:", error);
        throw error;
    }
};