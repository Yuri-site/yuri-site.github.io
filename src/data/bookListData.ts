// src/data/bookListData.ts
export interface Book {
  _id: string; // MongoDB 的 ObjectId 作為字符串處理
  date: string;
  title: string;
  author: string;
  type: string;
  publisher: string;
  status: string;
  imageUrl: string;
}
