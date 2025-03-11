import axios from "axios";

// 定義輪播圖片的資料結構
export interface CarouselItem {
    title: string;
    articleLink: string;
    images: string[]; // 可以是圖片連結或上傳的圖片 URL
}

const API_URL = "http://localhost:5000/api/v1/carousel"; // 根據你的後端 API 調整

// 上傳輪播圖片
export const uploadCarouselItem = async (data: CarouselItem): Promise<CarouselItem> => {
    try {
        const response = await axios.post(API_URL, data);
        return response.data;
    } catch (error) {
        console.error("Error uploading carousel item:", error);
        throw error;
    }
};

// 取得所有輪播圖片
export const fetchCarouselItems = async (): Promise<CarouselItem[]> => {
    try {
        const response = await axios.get<CarouselItem[]>(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching carousel items:", error);
        throw error;
    }
};

// 刪除輪播圖片
export const deleteCarouselItem = async (id: string): Promise<void> => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        console.error("Error deleting carousel item:", error);
        throw error;
    }
};
