const About = () => {
    return (
        <div className="min-h-[70vh] flex justify-center bg-white mt-12 px-6 py-12">
            <div className="max-w-3xl w-full text-gray-800">
                <h1 className="text-3xl font-bold text-center mb-6">
                    關於我們
                </h1>
                <p className="mb-4 leading-relaxed">
                    <strong>百合坂（Yurizaka）</strong>{" "}
                    是致力於整理與推廣台灣百合作品的非營利網站，成立於 2025 年。
                    最初以 Google Sheet{" "}
                    形式對外公開資料，後逐步建置成目前的網站，
                    期望能提供台灣出版之正版百合作品更清晰且統一的資訊資源。
                </p>
                <p className="mb-4 leading-relaxed">
                    在台灣，百合作品雖逐漸受到重視，但因出版社或書店分類問題，相關資料仍常常分散、零碎、不易查找。
                    因此我們建立了百合坂，希望成為百合作品的資料庫，讓百合閱聽人能夠更輕鬆地找到自己喜愛的作品，
                    也讓更多原創百合創作者的心血被看見。
                </p>
                <p className="mb-4 leading-relaxed">
                    百合坂以建立台灣百合作品資料庫為核心目標，將持續致力於收錄並整理所有曾在台灣出版的百合作品。
                    資訊的完整與可見性，是作品能被理解、被欣賞的第一步。
                </p>
                <p className="leading-relaxed">
                    我們支持百合作品中的原創性與多樣性，尊重每一位讀者與創作者的詮釋與立場。
                    未來，我們希望百合坂不只是資料平台，更能成為讀者與作品之間的交流空間，
                    推動屬於台灣的百合文化發展。
                </p>
            </div>
        </div>
    );
};

export default About;
