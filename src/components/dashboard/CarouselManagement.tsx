import { useState } from "react";
import { uploadCarouselItem } from "../../api/carousel";

const CarouselManagement: React.FC = () => {
    const [title, setTitle] = useState("");
    const [articleLink, setarticleLink] = useState("");
    const [imageLink, setImageLink] = useState("");
    const [images, setImages] = useState<string[]>([]);
    const [fileNames, setFileNames] = useState<string[]>([]);

    const handleDelete = (index: number) => {
        setImages(images.filter((_, i) => i !== index));
        setFileNames(fileNames.filter((_, i) => i !== index));
    };

    const handleSubmit = async () => {
        if (!title || !articleLink || (!imageLink && images.length === 0)) {
            alert("請填寫標題、文章連結，並至少上傳一張圖片或輸入圖片連結！");
            return;
        }

        try {
            await uploadCarouselItem({
                title,
                images: imageLink ? [imageLink] : images,
                articleLink,
            });

            alert("上傳成功！");
            setTitle("");
            setarticleLink("");
            setImageLink("");
            setImages([]);
            setFileNames([]);
        } catch (error) {
            alert("上傳失敗，請稍後再試！");
            console.error("Upload error:", error);
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            {/* Title */}
            <h2 className="text-center text-2xl font-semibold my-8">輪播片設定</h2>

            {/* Input Fields */}
            <div className="w-full">
                <div className="flex gap-2 mb-4 justify-center w-full">
                    <input 
                        type="text" 
                        placeholder="輸入標題" 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="border p-2 w-1/2 rounded-md" 
                    />
                    <input 
                        type="text" 
                        placeholder="輸入文章連結" 
                        value={articleLink}
                        onChange={(e) => setarticleLink(e.target.value)}
                        className="border p-2 w-1/2 rounded-md" 
                    />
                </div>

                <div className="flex gap-2 items-center mb-4">
                    <input 
                        type="text"
                        placeholder="請貼上圖片連結"
                        value={imageLink}
                        onChange={(e) => setImageLink(e.target.value)}
                        className="border p-2 w-full rounded-md bg-gray-100 text-gray-600"
                    />
                </div>

                {/* <div className="flex gap-2 items-center mb-4">
                    <input type="file" accept="image/*" onChange={handleUpload} className="hidden" id="upload" multiple />
                    <label htmlFor="upload" className="text-center w-full px-4 py-2 bg-gray-500 text-white rounded-md cursor-pointer">
                        選擇圖片
                    </label>
                </div> */}

                {/* Submit Button */}
                <button 
                    onClick={handleSubmit}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                    確認上傳
                </button>
            </div>

            {/* Image Grid */}
            <div className="grid grid-cols-3 gap-4 mt-6">
                {images.map((src, index) => (
                    <div key={index} className="relative border rounded-lg p-2 bg-gray-200">
                        <img src={src} alt="輪播片" className="w-full h-32 object-cover rounded-md" />
                        <button
                            onClick={() => handleDelete(index)}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 text-sm"
                        >
                            ✖
                        </button>
                        <p className="text-center mt-1 text-sm">{fileNames[index]}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CarouselManagement;
