// import Carousel from "../components/Carousel";
// import BookSection from "../components/BookSection";
// import { carouselImages, bookSections } from "../data/homeData";

const Home = () => {
    return (
        <div className="min-h-[100vh] max-w-screen items-center justify-center">
            {/* <section className="my-12">
                <Carousel images={carouselImages} />
            </section>

            <section className="container mx-auto flex flex-wrap">
                {bookSections.map((section, index) => (
                    <BookSection key={index} title={section.title} items={section.items} />
                ))}
            </section> */}
            <div>
                <p className="text-4xl font-bold text-center mt-96">還沒弄好_(:3 」∠ )_</p>
            </div>
            <div>
                <p className="text-4xl font-bold text-center mt-[100vh] mb-[50vh]">就說還沒弄好了_(:3 」∠ )_</p>
            </div>
            <div>
                <p className="text-4xl font-bold text-center mt-[100vh] mb-[50vh]">你怎麼還在滑&gt;:(</p>
            </div>
            <div>
                <p className="text-4xl font-bold text-center mt-[100vh] mb-[50vh]">沒東西了</p>
            </div>
            <div>
                <p className="text-4xl font-bold text-center mt-[100vh] mb-[50vh]">真的</p>
            </div>
            <div>
                <p className="text-4xl font-bold text-center mt-[100vh] mb-8">罰你聽雑踏</p>
            </div>
            <div className="flex items-center justify-center mb-[50vh]">
            <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/YDLafQ-Rg-k?si=Lr2Nb9vgCsAJiRiW"
                title="YouTube video player"
                frameBorder="0"  // Updated here
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"  // Updated here
                allowFullScreen  // Updated here
                ></iframe>
            </div>
            {/* <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiXjmmVDuml3InHb4MIM3_9uuWeDwNyL625nDxFT4S8FXqqGactQ8iSPka3TncEwH7IAH9MMuayIC6gMQg3_rHzQZso6IfdVF4fKeDzdAR_e4ZdzVlFwhhA2agMpuhhSZro_Ud4U_Uh2wRF/s450/job_kouji_stop2.png" alt="" /> */}
        </div>
    );
};

export default Home;
