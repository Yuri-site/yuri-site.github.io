# 百合作品整理網站

## 使用技術

* 前端
    * React + Vite
    * Tailwind CSS
    * Figma UI設計
* 後端
    * Node.js + Express
* 資料庫
    * MongoDB Altas
* 部屬
    * 前端部屬於 GitHub Pages
    * 後端使用 Docker 容器化，部屬在個人NAS

## Schema

* book Tab
    * sort: number
    * title: string
    * col_tabs: {key: keyof Book;label: string;}[]; `該顯示book的哪些資訊`
* book
    * date: string
    * title: string
    * author: string
    * type: string
    * publisher: string
    * status: string
    * image_url: string
    * tabs: string[] `在哪些tab會顯示`
* logs
    * _id: ObjectId
    * userId: ObjectId,
    * actionType: "create" | "update" | "delete",
    * targetType: "book" | "bookTab",
    * targetId: ObjectId,
    * timestamp: ISODate,
    * beforeData: Object,
    * afterData: Object,
    * description: String
