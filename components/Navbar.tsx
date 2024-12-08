
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
    setOpenSubmenu((prevIndex) => (prevIndex === index ? null : index));

  };
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const menuItems = [
    {
      icon: Store,
      label: "ABOUT US",
      submenu: [
        { label: "Adminstrator", link: "" },
        { label: "Principle Desk", link: "/" },
      ],
    },
    {
      icon: GraduationCap,
      label: "ADMISSION",
      submenu: [
        { label: "Graduation", link: "" },
        { label: "Post Graduation", link: "" },
      ],
    },
    {
      icon:ArrowDownToLine,
      label: "PROSPECT & PAMPLET",

    },
    {
      icon: School,
      label: "ACADEMIC",
      submenu: [
        { label: "Graduation", link: "" },
        { label: "Post Graduation", link: "" },
      ],
    },
    {
      icon: ArrowDownToLine,
      label: "UDAN & RULES",
      submenu: [
        { label: "Udan1", link: "" },
        { label: "Udan2", link: "" },
      ],
    },
    {
      icon: BookOpenCheck,
      label: "EXAMINATION CENTER",
      submenu: [
        { label: "Label1", link: "" },
        { label: "Label2", link: "" },
      ],
    },
    {
      icon: HandHelping,
      label: "STUDENT'S SUPPORT",
      submenu: [
        { label: "Label1", link: "" },
        { label: "Label2", link: "" },
      ],
    },
    {
      icon: GraduationCap,
      label: "IQAC",

    },
    {
      icon: Handshake,
      label: "ALUMNI",

    },
    {
      icon: Images,
      label: "GALLERY",

    },
    {
      icon: Youtube,
      label: "YOUTUBE",

    },
    {
      icon: Newspaper,
      label: "NEWS & MEDIA",
      submenu: [
        { label: "Label1", link: "" },
        { label: "Label2", link: "" },
      ],
    },
    {
      icon: Users,
      label: "FACULTY",
      submenu: [
        { label: "Label1", link: "" },
        { label: "Label2", link: "" },
      ],
    },
    {
      icon: ChartNoAxesCombined,
      label: "NAAC",

    },
    {
      icon: SquareUserRound,
      label: "CONTACT US",

    },
    {
      icon: MessageSquareReply,
      label: "FEEDBACKS",

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
        <span className="text-white ml-2 font-serif">+18888878858</span> {/* Phone number */}
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
              <span className="text-sm font-serif">CAREERS</span>
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
              <span className="text-sm font-serif"                         onClick={togglePopup}
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
            onClick={() => item.submenu && handleSubmenuToggle(index)} // Only toggle if submenu exists
          >
            <div className="flex items-center space-x-2">
              <item.icon className="h-6 w-6 text-gray-700" />
              <span className="text-gray-800 font-semibold font-serif">
                {item.label}
              </span>
            </div>
            {/* Toggle Icon */}
            {item.submenu && (
              <span className="text-gray-600">
                {openSubmenu === index ? "▲" : "▼"}
              </span>
            )}
          </div>

          {/* Submenu */}
          {item.submenu && openSubmenu === index && (
            <div className="ml-6 mt-2">
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
