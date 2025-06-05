const Privacy = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-white px-6 py-12">
            <div className="max-w-3xl w-full text-gray-800 mb-12">
                <h1 className="text-3xl font-bold text-center mb-8">
                    隱私政策
                </h1>

                <p className="mb-4 leading-relaxed">
                    「百合坂」（以下簡稱本網站）尊重並重視使用者的個人資料與隱私權。為保障您的權益，說明本網站蒐集、使用與保護個人資訊之方式如下：
                </p>

                <div className="space-y-6 text-justify leading-relaxed">
                    <div>
                        <h2 className="font-semibold text-lg mb-1">
                            一、適用範圍
                        </h2>
                        <p>
                            本政策適用於您瀏覽本網站、或使用本網站所提供之表單等功能時所涉及的資料蒐集與使用行為。
                            本政策不適用於連結至本網站之外的其他網站或服務。
                        </p>
                    </div>

                    <div>
                        <h2 className="font-semibold text-lg mb-1">
                            二、資料蒐集說明
                        </h2>
                        <p>
                            本網站目前不設會員功能，也不主動蒐集任何可識別個人身份的資訊。當您使用「作品補充報錯表單」功能時：
                        </p>
                        <ul className="list-disc list-inside mt-2 ml-4 space-y-1">
                            <li>表單不會要求您填寫姓名或電子郵件。</li>
                            <li>
                                所提交內容僅包含與作品資料相關的補充建議，用於改善網站資料庫之完整性與準確性。
                            </li>
                            <li>
                                不會紀錄任何可識別個人身份的資訊，亦不會追蹤個別使用者填寫紀錄。
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="font-semibold text-lg mb-1">
                            三、Cookie 使用說明
                        </h2>
                        <p>
                            截至目前為止，本網站未使用 Cookie
                            技術進行個人化追蹤或行銷用途。 若未來新增服務涉及
                            Cookie 使用，將另行於本頁說明並更新政策內容。
                        </p>
                    </div>

                    <div>
                        <h2 className="font-semibold text-lg mb-1">
                            四、資料使用與保護
                        </h2>
                        <p>
                            所有使用者提供之內容，僅供網站內容整理、資料補充與改善服務品質之用。
                            本網站不會將使用者資訊提供、販售或交換給第三方，亦不會用於未經同意的聯繫或推銷行為。
                        </p>
                    </div>

                    <div>
                        <h2 className="font-semibold text-lg mb-1">
                            五、第三方連結
                        </h2>
                        <p>
                            本網站可能連結至出版社、書籍平台或活動頁面等第三方網站，
                            這些網站的隱私權政策與本網站無涉，請使用者自行判斷與查閱。
                        </p>
                    </div>

                    <div>
                        <h2 className="font-semibold text-lg mb-1">
                            六、政策更新
                        </h2>
                        <p>
                            本網站保留隨時修改本政策之權利，修改後將更新於本頁面。
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Privacy;
