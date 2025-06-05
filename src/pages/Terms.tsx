const Terms = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-white px-6 py-12">
            <div className="max-w-3xl w-full text-gray-800 mb-12">
                <h1 className="text-3xl font-bold text-center mb-8">
                    免責聲明
                </h1>

                <p className="mb-4 leading-relaxed text-justify">
                    歡迎瀏覽「百合坂」（以下簡稱本網站）。本網站致力於整理繁體中文出版之正版百合作品，並提供讀者參考之書單推薦與相關活動資訊。
                    為保障使用者權益，並釐清本網站之責任範圍，特此聲明如下：
                </p>

                <div className="space-y-6 leading-relaxed text-justify">
                    <div>
                        <h2 className="font-semibold text-lg mb-1">
                            一、資訊來源與正確性
                        </h2>
                        <p>
                            本網站所提供之資料，主要來自出版社公告、全國新書資訊網、各式書局書訊。所有內容均經人工整理與編修，
                            惟無法保證資訊的即時性、完整性或正確性。
                            使用者於參考相關內容後，仍應自行查證原始資訊。
                            對於因資料錯誤、延遲更新或使用本網站資訊所造成的任何損失，本網站恕不負責。
                        </p>
                    </div>

                    <div>
                        <h2 className="font-semibold text-lg mb-1">
                            二、著作權聲明
                        </h2>
                        <p>
                            本網站所使用之書籍封面、作品名稱、介紹文字等素材，其著作權皆屬原作者、出版社或合法授權方所有，
                            僅作資訊整理與推廣之用途。如有侵權疑慮，請來信告知，本網站將於收到通知後儘速處理。
                        </p>
                    </div>

                    <div>
                        <h2 className="font-semibold text-lg mb-1">
                            三、作品歸類與內容詮釋
                        </h2>
                        <p>
                            本網站所標示之「百合」屬性或分類（如是否為百合作品、百合成分強度等），
                            係由網站營運者基於自身理解與編輯原則所做之主觀判斷，僅供參考，
                            並不代表作品原作者、出版社或第三方之官方立場。
                            針對讀者因作品分類或描述所產生之期待落差、價值觀差異或相關爭議，本網站恕不負責。
                        </p>
                    </div>

                    <div>
                        <h2 className="font-semibold text-lg mb-1">
                            四、使用者提供資訊
                        </h2>
                        <p>
                            本網站提供讀者填寫表單以協助補充未收錄作品或更正資料。
                            該表單內容將作為網站資料參考與內容優化之用途，
                            所有填寫內容之正確性與合法性由填寫者自行負責。
                            本網站保留是否採納、修改或刪除用戶提供內容之權利。
                        </p>
                    </div>

                    <div>
                        <h2 className="font-semibold text-lg mb-1">
                            五、第三方連結與合作資訊
                        </h2>
                        <p>
                            本網站可能提供導向第三方網站之連結（例如出版社、活動頁面等），
                            該網站內容與本網站無涉。本網站不對任何外部連結之內容、服務或安全性承擔責任。
                        </p>
                        <p className="mt-2">
                            目前本網站不含商業廣告，惟未來不排除與廠商合作、舉辦集資活動或展示合作資訊之可能。
                            屆時相關內容將明確標註，並遵守資訊公開原則與合作方之合法規範。
                        </p>
                    </div>

                    <div>
                        <h2 className="font-semibold text-lg mb-1">
                            六、網站變更與聲明更新
                        </h2>
                        <p>
                            本網站保留隨時修改內容、功能與本免責聲明之權利，恕不另行通知。
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Terms;
