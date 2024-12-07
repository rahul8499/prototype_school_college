"use client"; // This tells Next.js that this component uses client-side features

import React, { useEffect, useState } from "react";
import Image from "next/image";
import topHeadingBackground from "./assets/topheaderbackground.jpg";
import jadhavarCollgeLogo from "./assets/jadhavarCollgeLogo.png";
import sudhakarraosirpic from "./assets/sudhakarraosirpic.png";
import Crousel1 from "./assets/Crousel1.jpg";
import Crousel2 from "./assets/Crousel2.png";
import bannerPeople from "./assets/bannerPeople1.png";

import BannerPeople from "./assets/BannerPeople.png";
import OwnerPic from "./assets/OwnerPic.png";
import CrouselImage2 from "./assets/CrouselImage2.png";

import awards from "./assets/awards.png";
import medal1 from "./assets/medal1.jpg";
import Medal from "./assets/Medal.png";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./home.css";
import {
  ArrowDownToLine,
  BookOpenCheck,
  ChartNoAxesCombined,
  CircleHelp,
  GraduationCap,
  HandHelping,
  Handshake,
  Images,
  Mail,
  MessageSquareReply,
  Newspaper,
  Phone,
  School,
  ShieldCheck,
  SquareUserRound,
  Store,
  User,
  Users,
  Youtube,
  Menu,
  Send,
  Trophy,
  ClipboardList,
  Calendar,
} from "lucide-react";
import ChatBot from "../../components/ChatBot";
import ContactForm from "../../components/ContactForm";

const awardAchievements = [
  {
    title: "Award Achievement",
    content: "Our institution has won the best academic award of 2024!",
    date: "15 Oct",
  },
  {
    title: "Outstanding Performance",
    content:
      "Congratulations to the students who achieved the highest grades in this semester.",
    date: "10 Nov",
  },
  {
    title: "Innovation in Teaching",
    content: "Awarded for excellence in innovative teaching methods in 2023.",
    date: "20 Dec",
  },
  {
    title: "Community Impact",
    content:
      "Recognized for outstanding contributions to community service projects.",
    date: "5 Mar",
  },
  {
    title: "Research Excellence",
    content: "Faculty published groundbreaking research in renewable energy.",
    date: "18 Apr",
  },
  {
    title: "Cultural Harmony",
    content: "Students won the cultural diversity award for their performance.",
    date: "22 May",
  },
  {
    title: "Leadership Excellence",
    content: "Awarded to our principal for visionary leadership.",
    date: "30 Jun",
  },
  {
    title: "Best Infrastructure",
    content:
      "Campus awarded for state-of-the-art facilities and eco-friendly design.",
    date: "1 Aug",
  },
  {
    title: "Alumni Achievement",
    content: "Celebrating the global achievements of our alumni network.",
    date: "25 Sep",
  },
  {
    title: "Sports Championship",
    content: "Victory in the state-level sports championship of 2023.",
    date: "10 Dec",
  },
];

const noticeBoard = [
  {
    id: 1,
    title: "University Exams",
    content:
      "The university exams are scheduled for next month. Please check the official notice board.",
    date: "15 Oct",
  },
  {
    id: 2,
    title: "New Admission Open",
    content: "Admissions for the upcoming semester are open. Apply now!",
    date: "20 Oct",
  },
  {
    id: 3,
    title: "Scholarship Program",
    content: "Apply for scholarships by the end of this month.",
    date: "30 Oct",
  },
  {
    id: 4,
    title: "Holiday Announcement",
    content:
      "The institute will remain closed on account of public holidays next week.",
    date: "5 Nov",
  },
  {
    id: 5,
    title: "Library Timings",
    content: "Library will extend working hours during exam preparation week.",
    date: "10 Nov",
  },
  {
    id: 6,
    title: "Workshop Schedule",
    content: "A career workshop will be held in the auditorium this Friday.",
    date: "15 Nov",
  },
  {
    id: 7,
    title: "Placement Drive",
    content: "Top companies are visiting the campus for placements next month.",
    date: "20 Nov",
  },
  {
    id: 8,
    title: "Extra Classes",
    content: "Extra classes for subject improvement will start next week.",
    date: "25 Nov",
  },
  {
    id: 9,
    title: "Hostel Update",
    content:
      "Hostel renovation work will be completed by the end of the semester.",
    date: "1 Dec",
  },
  {
    id: 10,
    title: "Fee Reminder",
    content:
      "Kindly pay the semester fees before the deadline to avoid penalties.",
    date: "10 Dec",
  },
];

const newsEvents = [
  {
    id: 1,
    title: "Tech Fest 2024",
    content:
      "Our college is hosting a tech fest this weekend. Don't miss out on the exciting events!",
    date: "15 Oct",
  },
  {
    id: 2,
    title: "Sports Day",
    content:
      "The annual sports day event will be held next week. Be ready to participate!",
    date: "20 Oct",
  },
  {
    id: 3,
    title: "Cultural Fest",
    content: "Join us in celebrating our annual cultural fest this month.",
    date: "5 Nov",
  },
  {
    id: 4,
    title: "Guest Lecture",
    content:
      "An industry expert will be giving a guest lecture on AI innovations.",
    date: "10 Nov",
  },
  {
    id: 5,
    title: "Startup Meetup",
    content: "A startup networking event will be organized on campus.",
    date: "15 Nov",
  },
  {
    id: 6,
    title: "Alumni Meet",
    content: "Reconnect with alumni during the upcoming meet-and-greet event.",
    date: "25 Nov",
  },
  {
    id: 7,
    title: "Coding Hackathon",
    content: "Show off your coding skills at the 24-hour hackathon challenge.",
    date: "30 Nov",
  },
  {
    id: 8,
    title: "Art Exhibition",
    content: "View amazing artwork created by our talented students.",
    date: "5 Dec",
  },
  {
    id: 9,
    title: "Blood Donation Camp",
    content: "Participate in the blood donation drive to save lives.",
    date: "10 Dec",
  },
  {
    id: 10,
    title: "Tree Plantation Drive",
    content: "Join hands to make our campus greener with the plantation drive.",
    date: "15 Dec",
  },
];

const Home = () => {
  const [activeIndex, setActiveIndex] = useState(0); // Track the active slide
  const [activeId, setActiveId] = useState(0); // You can change the index dynamically
  const [isPopupOpen, setPopupOpen] = useState(false);

  // Toggle popup visibility
  const togglePopup = () => {
    setPopupOpen(!isPopupOpen);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    pauseOnHover: false,

    waitForAnimate: true,
    afterChange: (index: number) => {
      setActiveIndex(index); // Update active index on slide change
    },
    appendDots: (dots: React.ReactNode) => (
      <div style={{ bottom: "0px" }}>
        <ul>{dots}</ul>
      </div>
    ),
    customPaging: (i: number) => (
      <div
        className={`w-4 h-4 rounded-full cursor-pointer ${
          i === activeIndex ? "bg-orange-600" : "bg-white"
        }`}
      />
    ),
  };
  const [awardCurrentCard, awardSetCurrentCard] = useState(0); // Index of the currently displayed card

  useEffect(() => {
    const interval = setInterval(() => {
      awardSetCurrentCard(
        (prevCard) => (prevCard + 1) % awardAchievements.length
      ); // Cycle to the next card
    }, 10000); // Change card every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  const [noticeCurrentCard, noticeSetCurrentCard] = useState(0); // Index of the currently displayed card

  useEffect(() => {
    const interval = setInterval(() => {
      noticeSetCurrentCard(
        (prevCard) => (prevCard + 1) % awardAchievements.length
      ); // Cycle to the next card
    }, 10000); // Change card every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  // export default renderAwardAchievements;

  return (
    <div>
      <div>
        <div>
          <Slider {...settings}>
            <div
              className="relative flex justify-center lg:h-[50vh]
 h-[35vh] "
            >
              <Image
                src={CrouselImage2}
                alt="?"
                title="?"
                layout="fill" // Ensure the image fills the parent container
                objectFit="contain" // Use cover to ensure the image covers the area without distorting
                className="z-0"
              />

              {/* Overlay */}
              <div
                className="absolute inset-0"
                style={{ backgroundColor: "#09287D", opacity: 0.75 }}
              ></div>

              {/* Centered Text */}
              <div className="absolute  font-serif inset-0 flex items-center justify-center z-10">
                <div className="text-white text-center lg:text-4xl text-lg font-semibold leading-[1.45]">
                  Begin your journey to fulfilling your dreams at our college!{" "}
                  <br />
                  <h6 className=" lg:text-xl text-sm">
                    "New technology, experienced teachers, and an advanced
                    educational experience."
                  </h6>{" "}
                </div>
              </div>

              <div className="relative flex justify-start items-center lg:h-[50vh] h-[35vh]">
                {/* Image Section */}
                <div className="absolute inset-y-0 mt-4 left-0 flex items-start">
                  <Image
                    src={Medal}
                    alt="?"
                    title="?"
                    layout="intrinsic"
                    objectFit="contain"
                    className="lg:w-[12vw] w-20"
                  />
                </div>

                {/* Text Over Image */}
                <div>
                  <h1 className="absolute lg:inset-y-20 mt-4 lg:mt-0   text-[#FFD700] font-bold inset-y-6 lg:text-4xl lg:left-24 left-9 font-serif  flex items-start">
                    1
                  </h1>
                </div>
              </div>

              {/* Right Side Image */}
              <div className="absolute inset-y-0 right-0 flex items-end">
                <Image
                  src={OwnerPic}
                  alt="?"
                  title="?"
                  layout="intrinsic" // Adjusts to image's natural dimensions
                  objectFit="contain"
                  className="lg:w-[46vw] w-auto" // Ensures responsive width
                />
              </div>
            </div>

            <div
              className="relative flex justify-center lg:h-[50vh]
 h-[35vh] "
            >
              <Image
                src={Crousel1}
                alt="?"
                title="?"
                layout="fill" // Ensure the image fills the parent container
                objectFit="contain" // Use cover to ensure the image covers the area without distorting
                className="z-0"
              />
              {/* #BE6804 */}
              {/* Overlay */}
              <div
                className="absolute inset-0"
                style={{ backgroundColor: "#A3363D", opacity: 0.75 }}
              ></div>

              {/* Centered Text */}
              <div className="absolute  font-serif inset-0 flex items-center justify-center z-10">
                <div className="text-white text-center lg:text-4xl text-lg font-semibold leading-[1.45]">
                  Your Journey to Success Begins Here!
                  <br />
                  <h6 className=" lg:text-xl text-sm">
                    “Experience quality education, modern facilities, and
                    opportunities to shape your future.”
                  </h6>{" "}
                </div>
              </div>

              <div className="relative flex justify-start items-center lg:h-[50vh] h-[35vh]">
                {/* Image Section */}
                <div className="absolute inset-y-0 mt-4 left-0 flex items-start">
                  <Image
                    src={Medal}
                    alt="?"
                    title="?"
                    layout="intrinsic"
                    objectFit="contain"
                    className="lg:w-[12vw] w-20"
                  />
                </div>

                {/* Text Over Image */}
                <div>
                  <h1 className="absolute font-bold  lg:inset-y-20 mt-4 lg:mt-0  text-[#FFD700] inset-y-6 lg:text-4xl lg:left-24 left-9 font-serif  flex items-start">
                    1
                  </h1>
                </div>
              </div>

              {/* Right Side Image */}
              <div className="absolute inset-y-0 right-0 flex items-end">
                <Image
                  src={BannerPeople}
                  alt="?"
                  title="?"
                  layout="intrinsic" // Adjusts to image's natural dimensions
                  objectFit="contain"
                  className="lg:w-[42vw] w-auto" // Ensures responsive width
                />
              </div>
            </div>
            <div
              className="relative flex justify-center lg:h-[50vh]
 h-[35vh] "
            >
              <Image
                src={Crousel2}
                alt="?"
                title="?"
                layout="fill" // Ensure the image fills the parent container
                objectFit="contain" // Use cover to ensure the image covers the area without distorting
                className="z-0"
              />

              {/* Overlay */}
              <div
                className="absolute inset-0"
                style={{ backgroundColor: "#006A6A", opacity: 0.75 }}
              ></div>

              {/* Centered Text */}
              <div className="absolute  font-serif inset-0 flex items-center justify-center z-10">
                <div className="text-white text-center lg:text-4xl text-lg font-semibold leading-[1.45]">
                  Admissions Open for 2024 !
                  <br />
                  <h6 className=" lg:text-xl text-sm">
                    "Discover a world of opportunities. Join us to excel
                    academically and grow holistically."
                  </h6>{" "}
                </div>
              </div>

              <div className="relative flex justify-start items-center lg:h-[50vh] h-[35vh]">
                {/* Image Section */}
                <div className="absolute inset-y-0 mt-4 left-0 flex items-start">
                  <Image
                    src={Medal}
                    alt="?"
                    title="?"
                    layout="intrinsic"
                    objectFit="contain"
                    className="lg:w-[12vw] w-20"
                  />
                </div>

                {/* Text Over Image */}
                <div>
                  <h1 className="absolute font-bold  lg:inset-y-20 mt-4 lg:mt-0  inset-y-6 lg:text-4xl lg:left-24 left-9 font-serif text-[#FFD700] flex items-start">
                    1
                  </h1>
                </div>
              </div>

              {/* Right Side Image */}
              <div className="absolute inset-y-0 right-0 flex items-end">
                <Image
                  src={bannerPeople}
                  alt="?"
                  title="?"
                  layout="intrinsic" // Adjusts to image's natural dimensions
                  objectFit="contain"
                  className="lg:w-[42vw] w-auto" // Ensures responsive width
                />
              </div>
            </div>

            {/* <div>
              <img
                src="https://via.placeholder.com/800x400"
                alt="Slide 3"
                className="w-full "
                style={{ height: "50vh" }}
              />
            </div> */}
          </Slider>
        </div>
        <div className="flex flex-col lg:flex-row md:flex-row justify-center items-center md:gap-0 gap-6 lg:gap-0 m-4 py-6">
          {/* Award Achievement Card */}
          <div className="w-full sm:w-80 md:w-96   max-w-md border font-serif rounded-2xl border-l-4 border-l-orange-600 shadow-md">
            <h3 className="text-xl font-semibold  text-center p-2 text-orange-600 flex justify-center">
              <Trophy className="w-6 h-6 text-orange-600 mr-2" />
              Award Achievement
            </h3>
            <div className="card bg-white w-full h-80 rounded-2xl relative overflow-hidden">
              <div className="content w-full h-full p-6 font-serif absolute flex flex-col justify-start">
                {awardAchievements.map((item, index) => (
                  <div key={index} className="py-4">
                    <div className="flex">
                      <div className="text-xl text-orange-600 w-10 mr-4">
                        {item.date}
                      </div>
                      <div>
                        <h2 className="text-2xl font-semibold mb-2 text-gray-800">
                          {item.title}
                        </h2>
                        <p className="text-sm text-gray-700">{item.content}</p>
                      </div>
                    </div>
                    <hr className="border mt-2" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Notice Board Card */}
          <div className="w-full sm:w-80 md:w-96 max-w-md border font-serif rounded-2xl border-l-4 border-l-orange-600 shadow-md">
            <h3 className="text-xl font-semibold  text-center p-2 text-orange-600 flex items-center justify-center">
              <ClipboardList className="w-6 h-6 text-orange-600 mr-2" /> Notice
              Board
            </h3>
            <div className="card bg-white w-full h-80 rounded-2xl shadow-md relative overflow-hidden">
              <div className="content w-full h-full p-4 absolute p-6 font-serif flex flex-col justify-start">
                {noticeBoard.map((item, index) => (
                  <div key={index} className="py-4">
                    <div className="flex">
                      <div className="text-xl text-orange-600 w-10 mr-4">
                        {item.date}
                      </div>
                      <div>
                        <h2 className="text-2xl font-semibold mb-2 text-gray-800">
                          {item.title}
                        </h2>
                        <p className="text-sm text-gray-700">{item.content}</p>
                      </div>
                    </div>
                    <hr className="border mt-2" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* News & Events Card */}
          <div className="w-full sm:w-80 md:w-96 max-w-md border font-serif rounded-2xl border-l-4 border-l-orange-600 shadow-md">
            <h3 className="text-xl font-semibold  text-center p-2 text-orange-600 flex justify-center">
              <Calendar className="w-6 h-6 text-orange-600 mr-2" />
              News & Events
            </h3>
            <div className="card bg-white w-full h-80 rounded-2xl relative overflow-hidden">
              <div className="content w-full h-full p-6 font-serif absolute flex flex-col justify-start">
                {newsEvents.map((item, index) => (
                  <div key={index} className="py-4">
                    <div className="flex">
                      <div className="text-xl text-orange-600 w-10 mr-4">
                        {item.date}
                      </div>
                      <div>
                        <h2 className="text-2xl font-semibold mb-2 text-gray-800">
                          {item.title}
                        </h2>
                        <p className="text-sm text-gray-700">{item.content}</p>
                      </div>
                    </div>
                    <hr className="border mt-2" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <section id="awards" className="py-16 font-serif bg-slate-100">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center">
              Awards & Achievements
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Award 1 */}
              <div className="award-card bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:translate-x-2 hover:scale-105 flex gap-4">
                <div>
                  <Image
                    src={awards}
                    alt="Best Placement among Educational Institutions"
                    className="h-16 w-16 object-cover"
                    height={64}
                    width={64}
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-700">
                    Best Placement among Educational Institutions
                  </h3>
                  <p className="text-gray-500">
                    Pune, Maharashtra - By Brands Academy
                  </p>
                </div>
              </div>

              {/* Award 2 */}
              <div className="award-card bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:translate-x-2 hover:scale-105 flex gap-4">
                <div>
                  <Image
                    src={awards}
                    alt="Outstanding Contribution to Industry-Academia Partnership"
                    className="h-16 w-16 object-cover"
                    height={64}
                    width={64}
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-700">
                    Outstanding Contribution to Industry-Academia Partnership
                  </h3>
                  <p className="text-gray-500">By Wipro</p>
                </div>
              </div>

              {/* Award 3 */}
              <div className="award-card bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:translate-x-2 hover:scale-105 flex gap-4">
                <div>
                  <Image
                    src={awards}
                    alt="Best Educationist Award"
                    className="h-16 w-16 object-cover"
                    height={64}
                    width={64}
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-700">
                    Best Educationist Award
                  </h3>
                  <p className="text-gray-500">
                    By International Institute of Education & Management, New
                    Delhi
                  </p>
                </div>
              </div>

              {/* Award 4 */}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
