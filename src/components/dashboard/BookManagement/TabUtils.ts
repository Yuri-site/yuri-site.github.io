import { BookTab } from "../../../types";

// Function to get color class based on tab
export const getTabColorClass = (tab: BookTab | string, tabs: BookTab[]): string => {
  // If tab is a string (tab ID), find the corresponding tab object
  const tabObj = typeof tab === 'string' 
    ? tabs.find(t => t._id === tab) 
    : tab;
  
  // Default color if tab not found
  if (!tabObj) return 'bg-gray-200 text-gray-800';
  
  // Color mapping based on tab index to ensure consistent colors
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
  
  // Find index of tab in tabs array
  const tabIndex = tabs.findIndex(t => t._id === (typeof tab === 'string' ? tab : tab._id));
  
  // Return color class based on index, or default if not found
  return tabIndex >= 0 ? colorClasses[tabIndex % colorClasses.length] : 'bg-gray-200 text-gray-800';
};