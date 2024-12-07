
"use client"; // This tells Next.js that this component uses client-side features

import React, { useState } from 'react';import Link from 'next/link';
import { ArrowDownToLine, BookOpenCheck, ChartNoAxesCombined, CircleHelp, GraduationCap, HandHelping, Handshake, Images, Mail, MessageSquareReply, Newspaper, Phone, School, ShieldCheck, SquareUserRound, Store, User, Users, Youtube, Menu } from 'lucide-react';
import ContactForm from './ContactForm';
type NavbarProps = {
  className?: string;
};
const Navbar: React.FC<NavbarProps> = ({ className }) => {
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const handleSubmenuToggle = (index: any) => {
    setOpenSubmenu(openSubmenu === index ? null : index);
  };
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const menuItems = [
    {
      icon: Store,
      label: "ABOUT US",
      submenu: [
        { label: "Our History", link: "" },
        { label: "Mission & Vision", link: "" },
      ],
    },
    {
      icon: GraduationCap,
      label: "ADMISSION",
      submenu: [
        { label: "Apply Now", link: "" },
        { label: "Requirements", link: "" },
      ],
    },
    {
      icon: ArrowDownToLine,
      label: "PROSPECT & PAMPLET",
      submenu: [
        { label: "Brochure 2023", link: "" },
        { label: "Brochure 2024", link: "" },
      ],
    },
    {
      icon: School,
      label: "ACADEMIC",
      submenu: [
        { label: "Courses Offered", link: "" },
        { label: "Academic Calendar", link: "" },
      ],
    },
    {
      icon: ArrowDownToLine,
      label: "UDAN & RULES",
      submenu: [
        { label: "Apply Now", link: "" },
        { label: "Rules & Policies", link: "/" },
      ],
    },
    {
      icon: BookOpenCheck,
      label: "EXAMINATION CENTER",
      submenu: [
        { label: "Exam Schedule", link: "" },
        { label: "Guidelines", link: "" },
      ],
    },
    {
      icon: HandHelping,
      label: "STUDENT'S SUPPORT",
      submenu: [
        { label: "Counseling Services", link: "" },
        { label: "Financial Aid", link: "" },
      ],
    },
    {
      icon: ShieldCheck,
      label: "IQAC",
      submenu: [
        { label: "Quality Assurance", link: "" },
        { label: "Reports", link: "" },
      ],
    },
    {
      icon: Handshake,
      label: "ALUMNI",
      submenu: [
        { label: "Alumni Network", link: "/" },
        { label: "Events", link: "" },
      ],
    },
    {
      icon: Images,
      label: "GALLERY",
      submenu: [
        { label: "Photo Gallery", link: "" },
        { label: "Video Gallery", link: "" },
      ],
    },
    {
      icon: Youtube,
      label: "YOUTUBE",
      submenu: [
        { label: "Our Channel", link: "/" },
        { label: "Featured Videos", link: "" },
      ],
    },
    {
      icon: Newspaper,
      label: "NEWS & MEDIA",
      submenu: [
        { label: "Press Releases", link: "/" },
        { label: "Media Coverage", link: "" },
      ],
    },
    {
      icon: Users,
      label: "FACULTY",
      submenu: [
        { label: "Meet the Team", link: "/" },
        { label: "Join Us", link: "" },
      ],
    },
    {
      icon: ChartNoAxesCombined,
      label: "NAAC",
      submenu: [
        { label: "Accreditation", link: "" },
        { label: "Reports", link: "" },
      ],
    },
    {
      icon: SquareUserRound,
      label: "CONTACT US",
      submenu: [
        { label: "Contact Form", link: "" },
        { label: "Our Location", link: "" },
      ],
    },
    {
      icon: MessageSquareReply,
      label: "FEEDBACKS",
      submenu: [
        { label: "Submit Feedback", link: "" },
        { label: "View Feedback", link: "" },
      ],
    },
  ];
  const [isPopupOpen, setPopupOpen] = useState(false);

  // Toggle popup visibility
  const togglePopup = () => {
    setPopupOpen(!isPopupOpen);
  };
  return (
    <nav className=" text-black ">
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
        <button
        className="mx-3 block lg:hidden"
        onClick={() => setSidebarOpen(true)}
      >
        <Menu size={42} />
      </button>
      {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 text-xl font-bold">
              <Link href="/">MyApp</Link>
            </div>
            <div className="ml-10 flex space-x-4">
              <Link
                href="/batchList"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Batch
              </Link>
              <Link
                href="/appointment-list"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
               Faculties
              </Link>
              <Link
                href="/log-history"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Log History
              </Link>
            </div>
          </div>
        </div>
      </div> */}
        <div
        className="bg-cover bg-center top  bg-orange-600 "

      >

        <div className="flex flex-col md:flex-row justify-between h-auto md:h-10 px-4 md:px-10 lg:px-20 space-y-1 md:space-y-0">

          {/* Left Section with Email */}
          <div className="flex flex-row md:flex-row items-center  space-x-2 md:space-y-0 md:space-x-2"    >

          <a
      href="https://mail.google.com/mail/?view=cm&fs=1&to=admission@ac.in"
      className="font-serif text-sm text-white font-semibold flex items-center space-x-1"
      target="_blank" // Open link in new tab
      rel="noopener noreferrer" // Recommended for security reasons when using target="_blank"
    >
      <Mail className="h-5 w-6" /> {/* Mail icon */}
      <span>admission@ac.in</span> {/* Email text */}
    </a>
            <span className="border-l border-white h-6  md:inline-block"></span> {/* Vertical line */}

            <a href="https://wa.me/8888878858" target="_blank" rel="noopener noreferrer">
      <div className="flex items-center">
        <Phone className="h-5 w-6 text-white" /> {/* Phone icon */}
        <span className="text-white ml-2">+18888878858</span> {/* Phone number */}
      </div>
    </a>

          </div>


          {/* Middle Section with Links */}
          <div className="flex flex-row md:flex-row items-center  space-x-2 md:space-y-0 md:space-x-2">
            {/* CAREERS Link */}
            <a
              href="#"
              className="text-white flex items-center hover:text-black py-2 rounded-md text-sm space-x-1"
            >
              <div className= " font-serif flex items-center justify-cebg-blacknter h-6 w-6 text-white rounded-full ">
                <User className="h-4 w-4 text-white" /> {/* Icon with black background */}
              </div>
              <span className="text-sm">CAREERS</span>
            </a>

            {/* Vertical Separator */}
            <span className="border-l border-white h-6  md:inline-block"></span> {/* Vertical line */}

            {/* ENQUIRY NOW Link */}
            <a
              href="#"
              className="text-white flex items-center hover:text-black  rounded-md text-sm space-x-1"
            >
              <div className="font-serif flex items-center justify-center h-6 w-6 text-white rounded-full ">
                <CircleHelp className="h-4 w-4 text-white" /> {/* Icon with black background */}
              </div>
              <span className="text-sm"                         onClick={togglePopup}
              >ENQUIRY NOW</span>
            </a>
          </div>

        </div>

      </div>
      {sidebarOpen && (
        <div
          className="fixed bg-black bg-opacity-50 z-50 lg:hidden duration-300"
          // onClick={() => setSidebarOpen(false)}
        >
          <div
            className={`fixed top-0 left-0 h-full w-64 flex flex-col bg-white shadow-md  transition-transform duration-800 transform ${
              sidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            {/* Close Button */}
            <button
              className="  bg-orange-600 font-bold text-white p-2 text-right mb-4"
              onClick={() => setSidebarOpen(false)}
            >
              Close
            </button>

            {/* Menu Items */}
            <div className="flex-1 overflow-y-scroll">

            {menuItems.map((item, index) => (
              <div key={index} className="mb-5 ml-2 mr-2">
                {/* Main Menu Item */}
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => handleSubmenuToggle(index)}
                >
                  <div className="flex items-center space-x-2">
                    <item.icon className="h-6 w-6 text-gray-700" />
                    <span className="text-gray-800 font-semibold font-serif">{item.label}</span>
                  </div>
                  {/* Toggle Icon */}
                  <span className="text-gray-600">
                    {openSubmenu === index ? "▲" : "▼"}
                  </span>
                </div>

                {/* Submenu */}
                {openSubmenu === index && (
                  <div className="ml-6 mt-2 ">
                    {item.submenu.map((sub, subIndex) => (
                      <a
                        key={subIndex}
                        href={sub.link}
                        className="block font-serif text-gray-600 text-sm py-1 hover:underline"
                      >
                        {sub.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            </div>
          </div>
        </div>
      )}

    </nav>
  );
};

export default Navbar;
