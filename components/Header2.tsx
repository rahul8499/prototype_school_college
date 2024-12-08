import React, { useEffect, useState } from "react";
import ContactForm from "./ContactForm";
import topHeadingBackground from "../src/app/assets/topheaderbackground.jpg";
import Image from "next/image";
import jadhavarCollgeLogo from "../src/app/assets/jadhavarCollgeLogo.png";
import sudhakarraosirpic from "../src/app/assets//sudhakarraosirpic.png";
import { Send } from "lucide-react";
// Toggle popup visibility
type Header2Props = {
  className?: string;
};
const Header2: React.FC<Header2Props> = ({ className }) => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const togglePopup = () => {
    setPopupOpen(!isPopupOpen);
  };

  return (
    <div>
      {/* Background Section */}
      <div
        className="mx-auto px-4 py-6 sm:px-6 lg:px-8 middle"
        style={{
          backgroundImage: `url(${topHeadingBackground.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          {/* Logo and College Name Section */}
          <div className="flex flex-col items-start space-y-2">
            <div className="lg:flex items-center space-x-2">
              <a href="#" className="text-4xl font-bold">
                <Image
                  src={jadhavarCollgeLogo}
                  alt="College Logo"
                  className="h-16 w-auto"
                />
              </a>
              <span className="border-l border-orange-600 h-14 mx-2 hidden md:inline-block"></span>
              <div
                className="font-serif text-lg sm:text-xl md:text-2xl flex items-center text-orange-500"
                style={{ lineHeight: "1.5rem" }}
              >
                <Image
                  src={sudhakarraosirpic}
                  alt="Dr. Sudhakar Jadhavar"
                  className="h-16 w-auto"
                  height={64}
                  width={64}
                />
              <span className="border-l border-orange-600 h-16 mx-2 lg:hidden md:inline-block"></span>

                <span className="pl-2 font-semibold font-serif lg:text-3xl">
                  DR. SUDHAKAR JADHAVAR <br />
                  ARTS, COMMERCE & SCIENCE COLLEGE
                </span>
              </div>
            </div>

            {/* Accreditation Text Section */}
            <div className="font-serif text-xs sm:text-sm md:text-base text-gray-700 text-center md:text-left">
              Affiliated to Savitribai Phule Pune University, Pune <br />
              Approved by Government of Maharashtra <br />
              <b className="text-sm sm:text-base font-serif md:text-lg">
                Accredited by NAAC with "B" Grade
              </b>
            </div>
          </div>

          <button
            onClick={togglePopup}
            className="text-sm font-serif sm:text-base md:text-lg flex border border-orange-500 px-4 py-2 bg-orange-600 text-white rounded-md outline-none hover:bg-orange-500 hover:text-white transition-colors"
            style={{
              animation: "blink 1s infinite", // Custom blinking animation
            }}
          >
            Apply Now
            <Send className="h-5 w-5 ml-2" />
          </button>
        </div>
      </div>
      {isPopupOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-40">
          <div className="relative bg-white p-6 rounded-lg shadow-lg w-full sm:w-96">
            <button
              onClick={togglePopup}
              className="absolute top-2 right-2 text-gray-700 text-2xl"
            >
              &times; {/* Close button */}
            </button>
            <ContactForm />
          </div>
        </div>
      )}
    </div>
  );
};

export default Header2;
