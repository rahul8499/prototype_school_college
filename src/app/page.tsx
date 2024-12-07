
"use client"; // This tells Next.js that this component uses client-side features

// export default page
import ContactMap from '../../components/ContactMap';
import Navbar from '../../components/Navbar';
import Home from './home';
import { CircleHelp } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import ContactForm from '../../components/ContactForm'; // Adjust the import path as per your project structure
import ChatBot from '../../components/ChatBot';
import { MessageSquare } from 'lucide-react';
import Footer from '../../components/Footer';
import Header2 from '../../components/Header2';
import {  ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import CSS for react-toastify
import Header3 from '../../components/Header3';

const Page = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);

  // Toggle popup visibility
  const togglePopup = () => {
    setPopupOpen(!isPopupOpen);
    chatBotsetPopupOpen(false);

  };
  // const [chatBotPopupOpen, chatBotsetPopupOpen] = useState(true);
  const [chatBotPopupOpen, chatBotsetPopupOpen] = useState(false); // Start as false

  // Open the chatbot automatically after a few seconds
  useEffect(() => {
    const timeout = setTimeout(() => {
      chatBotsetPopupOpen(true);
    }, 3000); // 3000ms = 3 seconds

    return () => clearTimeout(timeout); // Cleanup timeout on unmount
  }, []);
  // Toggle popup visibility
  const toggleCHatPopup = () => {
    setPopupOpen(false);
    chatBotsetPopupOpen(!chatBotPopupOpen);


  };


  return (
<div className=" relative overflow-hidden ">
  <ToastContainer/>
{/* Main Content */}
      <Navbar />
      <Header2/>
      <Header3/>
      <Home />
      <ContactMap />
      <Footer/>

      {/* Enquiry Now Button */}
      <div className="fixed top-3/4 right-10 z-50">
    <button           onClick={togglePopup}
 className="bg-orange-600 flex font-bold text-white py-2 px-4 rounded shadow-lg hover:bg-orange-500 focus:outline-none transform rotate-90 origin-bottom-right">
   <CircleHelp/>  <p className="ml-2 font-serif"> ENQUIRE NOW</p>
    </button>
  </div>
  {isPopupOpen && (
         <div className="fixed inset-0  flex justify-center items-center  pointer-events-auto  ml-3 mr-3">
    <div className="relative bg-white p-6 rounded-lg shadow-lg w-full sm:w-96 z-50 pointer-events-auto">
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

{/* <div className="fixed top-3/4 right-10 z-50">
        <button
          onClick={toggleCHatPopup}
          className="bg-blue-600 text-white py-2 px-4 rounded-full shadow-lg hover:bg-blue-500 focus:outline-none"
        >
          Chat with us
        </button>
      </div> */}
      <div className="fixed bottom-4 right-10 z-50">
  <button
    onClick={toggleCHatPopup}
    // className="bg-orange-600 text-white    shadow-lg hover:bg-orange-500 focus:outline-none"
  >
 <span title="Chat">
    <MessageSquare className="w-14 h-14 text-4xl text-orange-600" />
  </span></button>
</div>

      {/* ChatBot Popup */}
      {chatBotPopupOpen && (
        <div className="fixed inset-0 flex justify-end items-end z-40 p-4 lg:end-16  mb-32 lg:p-0">
        <div className="relative bg-orange-600  lg:h-[520px]  rounded-3xl  shadow-lg w-full sm:w-96">
            <h4 className=" text-center text-2xl font-serif font-bold rounded-xl  text-white bg-orange-600 h-14 p-4">Chat with us</h4>
            <button
              onClick={toggleCHatPopup}
              className="absolute top-2 right-2 text-white text-2xl"
            >
              &times; {/* Close button */}
            </button>

            <ChatBot />
          </div>
        </div>
      )}    </div>

  );
};

export default Page;
