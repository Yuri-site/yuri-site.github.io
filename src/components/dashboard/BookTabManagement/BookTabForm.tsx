import { BookTab } from "../../../types";

const bookKeys = [
    "title",
    "author",
    "date",
    "type",
    "publisher",
    "status",
    "comment",
    "imageUrl",
] as const;

interface BookTabFormProps {
    formData: BookTab;
    editingId: string | null;
    setFormData: React.Dispatch<React.SetStateAction<BookTab>>;
    handleSubmit: (e: React.FormEvent) => void;
    handleColTabChange: (
        index: number,
        field: "key" | "label",
        value: string
    ) => void;
    handleAddColTab: () => void;
    handleRemoveColTab: (index: number) => void;
}

const BookTabForm: React.FC<BookTabFormProps> = ({
    formData,
    editingId,
    setFormData,
    handleSubmit,
    handleColTabChange,
    handleAddColTab,
    handleRemoveColTab,
}) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <form onSubmit={handleSubmit} className="mb-6 bg-white p-4 rounded shadow-md">
            <div className="mb-4">
                <label className="block font-medium">分類標題</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block font-medium">排序</label>
                <input
                    type="number"
                    name="order"
                    value={formData.order}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block font-medium mb-2">欄位設定</label>
                {formData.col_tabs.map((col, index) => (
                    <div key={index} className="flex items-center space-x-2 mb-2">
                        <select
                            value={col.key}
                            onChange={(e) => handleColTabChange(index, "key", e.target.value)}
                            className="border p-1 rounded"
                        >
                            {bookKeys.map((key) => (
                                <option key={key} value={key}>
                                    {key}
                                </option>
                            ))}
                        </select>
                        <input
                            type="text"
                            placeholder="顯示名稱"
                            value={col.label}
                            onChange={(e) => handleColTabChange(index, "label", e.target.value)}
                            className="border p-1 rounded w-40"
                        />
                        <button
                            type="button"
                            onClick={() => handleRemoveColTab(index)}
                            className="text-red-500 hover:underline"
                        >
                            移除
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={handleAddColTab}
                    className="text-blue-600 hover:underline mt-2"
                >
                    ＋新增欄位
                </button>
            </div>

            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                {editingId ? "更新分類" : "新增分類"}
            </button>
        </form>
    );
};

export default BookTabForm;
