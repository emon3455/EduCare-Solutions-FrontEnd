
import Contact from "../../components/Home/Contact";
import Banner from "../../components/Home/Banner";
import Information from "../../components/Home/Information";
import PopularCourse from "../../components/Home/PopularCourse";
import ExpertTeacher from "../../components/Home/ExpertTeacher";
const Home = () => {
    const popularCourses = [
        {
            CID: 1,
            title: "Web Development",
            TID: 101,
            TName: "Jhankar Mahbub",
            bannerURL: "https://i.ibb.co/KxDxppB/Rectangle-15-1.png",
            videoURL: "https://example.com/video1.mp4",
            description: "This is the description for Course 1.",
            rating: 4.5,
            totalstu: 1000,
            price: 49.99,
            completedstu: 500
        },
        {
            CID: 2,
            title: "Machine Learning",
            TID: 102,
            TName: "Ariyan Emon",
            bannerURL: "https://i.ibb.co/7QYST1W/Rectangle-15-2.png",
            videoURL: "https://example.com/video2.mp4",
            description: "Explore the fascinating world of machine learning. Understand algorithms, data modeling, and how to apply ML in real-world scenarios.",
            rating: 4.2,
            totalstu: 800,
            price: 39.99,
            completedstu: 300
        },
        {
            CID: 3,
            title: "Cyber Security",
            TID: 103,
            TName: "Saiful Azad",
            bannerURL: "https://i.ibb.co/QNQKdZh/Rectangle-15-3.png",
            videoURL: "https://example.com/video3.mp4",
            description: "Dive into the realm of cybersecurity. Learn about network security, encryption, ethical hacking, and protecting digital assets from cyber threats.",
            rating: 4.8,
            totalstu: 1200,
            price: 59.99,
            completedstu: 700
        }
    ];
    return (
        <div>
            <Banner />
            <Information />
            <PopularCourse popularCourses={popularCourses} />
            <ExpertTeacher />
            <Contact />
        </div>
    );
};

export default Home;