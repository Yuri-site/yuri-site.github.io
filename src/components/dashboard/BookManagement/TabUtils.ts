import { BookTab } from "../../../types";

export const getTabColorClass = (tab: BookTab | string, tabs: BookTab[]): string => {
    const tabObj = typeof tab === 'string' 
        ? tabs.find(t => t._id === tab) 
        : tab;
    
    if (!tabObj) return 'bg-gray-200 text-gray-800';
    
    const colorClasses = [
        'bg-blue-500 text-white',
        'bg-green-500 text-white',
        'bg-yellow-500 text-black',
        'bg-purple-500 text-white',
        'bg-pink-500 text-white',
        'bg-indigo-500 text-white',
        'bg-red-500 text-white',
        'bg-teal-500 text-white',
    ];
    
    const tabIndex = tabs.findIndex(t => t._id === (typeof tab === 'string' ? tab : tab._id));
    
    return tabIndex >= 0 ? colorClasses[tabIndex % colorClasses.length] : 'bg-gray-200 text-gray-800';
};