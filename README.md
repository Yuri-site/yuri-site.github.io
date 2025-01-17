# 百合作品整理

使用技術
* React + Vite
* Tailwind CSS
* Fontawesome
* Zustand
* Google Sheets + Apps Script

## Data type
```ts
export interface Book {
    date: string;
    title: string;
    author: string;
    type: string;
    publisher: string;
    status: string;
    imageUrl: string;
    notes: string
    // category: string;
}
```