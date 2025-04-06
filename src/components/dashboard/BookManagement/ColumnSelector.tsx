import React from "react";

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
    if (selectedCols.includes(attr)) {
      // 移除已選欄位
      handleColSelect(selectedCols.filter(col => col !== attr));
    } else {
      // 加入新欄位(不超過6個)
      if (selectedCols.length < 6) {
        // 添加新欄位，但不改變順序
        const newSelectedCols = [...selectedCols, attr];
        // 根據 allAttributes 中的定義順序排序
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
            {selectedCols.includes(attr) && (
              <span className="ml-2">✓</span>
            )}
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