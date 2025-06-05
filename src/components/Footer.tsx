import { MdEmail } from "react-icons/md";

const Footer: React.FC = () => {
    return (
        <footer className="bg-pink-200 text-black px-6 py-8 text-sm">
            <div className="max-w-6xl flex flex-col ml-6 md:mx-auto md:flex-row justify-between items-start gap-6">
                {/* Logo + 名稱 */}
                <div className=" font-chenyu">
                    <h2 className="text-5xl leading-none mb-1">百合坂</h2>
                    <p className="tracking-widest text-3xl">YURIZAKA</p>
                </div>

                {/* 導覽連結 */}
                <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
                    <a href="/#/about" className="hover:underline">
                        關於我們
                    </a>
                    <a
                        target="_blank"
                        href="https://cart.cashier.ecpay.com.tw/qp/xrJ5"
                        className="hover:underline"
                    >
                        贊助我們
                    </a>
                    <a href="/#/privacy" className="hover:underline">
                        隱私政策
                    </a>
                    <a
                        target="_blank"
                        href="https://forms.gle/Cnab9zdsTgHGkGSy5"
                        className="hover:underline"
                    >
                        作品補充表單
                    </a>
                    <a href="/#/terms" className="hover:underline">
                        免責聲明
                    </a>
                    <a
                        target="_blank"
                        href="https://forms.gle/1QGmPSLxo21qX5ue6"
                        className="hover:underline"
                    >
                        網站建議及問題回報
                    </a>
                </div>
            </div>

            {/* 分隔線 */}
            <div className="border-t border-black my-4" />

            {/* 底部聲明區 */}
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
                <p>本網站以提供臺灣百合作品資訊為主要服務。</p>
                <div className="flex items-center gap-2">
                    <MdEmail className="text-md mt-1" />
                    <a
                        href="mailto:yurisaka0000@gmail.com"
                        className="text-md hover:underline"
                    >
                        yurizakatw@gmail.com
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
