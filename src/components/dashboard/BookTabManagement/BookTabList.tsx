import { useEffect, useState, useMemo } from "react";
import { BookTab } from "../../../types";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import axios from "axios";
import { Book } from "../../../types";

interface BookTabListProps {
  tabs: BookTab[];
  loading: boolean;
  error: string | null;
  handleEdit: (tab: BookTab) => void;
  handleDelete: (id: string) => void;
  handleSort: (order: string[]) => void;
  onTabsUpdated?: () => void;
}

interface SortableBookTab {
  _id: string;
  id: string;
  title: string;
  order: number;
  col_tabs: { key: keyof Book; label: string }[];
}

interface SortableRowProps {
  tab: SortableBookTab;
  index: number;
  handleEdit: (tab: BookTab) => void;
  handleDelete: (id: string) => void;
}

// Sortable Item Component
const SortableRow: React.FC<SortableRowProps> = ({ tab, index, handleEdit, handleDelete }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id: tab._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <tr ref={setNodeRef} style={style} data-id={tab._id}>
      <td className="border p-2">
        <div className="flex items-center">
          <span
            className="mr-2 cursor-grab text-left"
            {...attributes}
            {...listeners}
          >
            ☰
          </span>
          <span className="text-center">{tab.title}</span>
        </div>
      </td>
      <td className="border p-2 text-center">{index}</td>
      <td className="border p-2 text-center text-sm">
        {tab.col_tabs && tab.col_tabs.length > 0
          ? tab.col_tabs.map((col: { key: keyof Book; label: string }) => `${col.label} (${col.key})`).join("、")
          : "—"}
      </td>
      <td className="flex border p-2 text-center space-x-2">
        <button
          onClick={() => handleEdit(tab)}
          className="bg-yellow-500 text-white px-2 py-1 rounded"
        >
          編輯
        </button>
        <button
          onClick={() => handleDelete(tab._id)}
          className="bg-red-500 text-white px-2 py-1 rounded"
        >
          刪除
        </button>
      </td>
    </tr>
  );
};

const BookTabList: React.FC<BookTabListProps> = ({
  tabs,
  loading,
  error,
  handleEdit,
  handleDelete,
  handleSort,
  onTabsUpdated
}) => {
  const [currentTabs, setCurrentTabs] = useState<BookTab[]>(tabs);
  const [isUpdating, setIsUpdating] = useState(false);
  const API_URL = `${import.meta.env.VITE_API_URL as string}/api/v1/bookTab`;

  useEffect(() => {
    if (!isUpdating && tabs.length > 0) {
      setCurrentTabs(tabs);
    }
  }, [tabs, isUpdating]);

  // Create sortable items
  const sortableItems = useMemo(() => {
    return [...currentTabs]
      .filter(tab => !!tab._id)
      .sort((a, b) => a.order - b.order)
      .map(tab => ({
        ...tab,
        id: tab._id as string,
        _id: tab._id as string,
      }));
  }, [currentTabs]);

  // Configure DnD sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Handle drag end and update order via API
  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over || active.id === over.id) {
      return;
    }

    // Prevent multiple simultaneous updates
    setIsUpdating(true);

    // Find the current indices
    const oldIndex = sortableItems.findIndex(item => item._id === active.id);
    const newIndex = sortableItems.findIndex(item => item._id === over.id);

    // Create the new array with updated positions
    const updatedItems = arrayMove(sortableItems, oldIndex, newIndex);
    
    // Update the local state immediately for better UX
    setCurrentTabs(prevTabs => {
      const reorderedTabs = [...prevTabs];

      updatedItems.forEach((item, index) => {
        const tabIndex = reorderedTabs.findIndex(tab => tab._id === item._id);
        if (tabIndex !== -1) {
          reorderedTabs[tabIndex] = {
            ...reorderedTabs[tabIndex],
            order: index
          };
        }
      });
      return reorderedTabs;
    });
    
    const updatedOrderList = updatedItems.map((item, index) => ({
      _id: item._id,
      order: index,
    }));

    try {
      await axios.patch(`${API_URL}/orderList`, {
        orderList: updatedOrderList,
      });

      console.log("排序更新成功");

      handleSort(updatedItems.map(item => item._id));
      
      if (onTabsUpdated) {
        onTabsUpdated();
      }
    } catch (err) {
      console.error("更新排序失敗", err);
      try {
        const response = await axios.get<BookTab[]>(`${API_URL}`);
        setCurrentTabs(response.data);
        if (onTabsUpdated) {
          onTabsUpdated();
        }
      } catch (fetchErr) {
        console.error("獲取原始數據失敗", fetchErr);
      }
    } finally {
      setIsUpdating(false);
    }
  };

  const renderKey = useMemo(() => {
    return sortableItems.map(item => item._id).join('-');
  }, [sortableItems]);

  return (
    <div>
      {loading ? (
        <p>載入中...</p>
      ) : (
        <DndContext
          key={renderKey}
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <table className="w-full">
            <thead>
              <tr>
                <th className="border p-2">標題</th>
                <th className="border p-2">順序</th>
                <th className="border p-2">列標籤</th>
                <th className="border p-2">操作</th>
              </tr>
            </thead>
            <SortableContext
              items={sortableItems.map(item => item._id)}
              strategy={verticalListSortingStrategy}
            >
              <tbody>
                {sortableItems.map((tab, index) => (
                  <SortableRow
                    key={tab._id}
                    tab={tab}
                    index={index}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                  />
                ))}
              </tbody>
            </SortableContext>
          </table>
        </DndContext>
      )}
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default BookTabList;