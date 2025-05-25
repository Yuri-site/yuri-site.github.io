interface ColumnSelectorProps {
    selectedCols: string[];
    allAttributes: string[];
    attrDisplayNames: Record<string, string>;
    handleColSelect: (cols: string[]) => void;
}

const ColumnSelector: React.FC<ColumnSelectorProps> = ({
    selectedCols,
    allAttributes,
    attrDisplayNames,
    handleColSelect,
}) => {
    const toggleColumn = (attr: string) => {
        const isFirst = attr === allAttributes[1];
        if (isFirst) return; // first selected column can't be cancelled

        if (selectedCols.includes(attr)) {
            handleColSelect(selectedCols.filter(col => col !== attr));
        } else {
            if (selectedCols.length < 6) {
                const newSelectedCols = [...selectedCols, attr];
                newSelectedCols.sort((a, b) =>
                    allAttributes.indexOf(a) - allAttributes.indexOf(b)
                );
                handleColSelect(newSelectedCols);
            }
        }
    };

    return (
        <div className="mb-6">
        <h3 className="font-bold mb-2">顯示欄位：</h3>
        <div className="flex flex-wrap gap-2">
            {allAttributes.map((attr) => (
            <button
                key={attr}
                type="button"
                onClick={() => toggleColumn(attr)}
                className={`px-3 py-1.5 rounded-lg border transition-colors ${
                selectedCols.includes(attr)
                    ? "bg-blue-500 text-white border-blue-600"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
                disabled={selectedCols.length >= 6 && !selectedCols.includes(attr)}
            >
                {attrDisplayNames[attr]}
                {selectedCols.includes(attr)}
            </button>
            ))}
        </div>
        <p className="text-sm text-gray-500 mt-2">
            已選擇 {selectedCols.length}/6 個欄位
        </p>
        </div>
    );
};

export default ColumnSelector;