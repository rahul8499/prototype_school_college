import React from 'react';
import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
import socialMedia3 from '../src/app/assets/socialMedia3.png'
import socialMedia1 from '../src/app/assets/socialMedia1.png'
import socialMedia2 from '../src/app/assets/SocialMedia2.png'


import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 font-serif">
              <li>
                <a href="#" className="hover:text-gray-400">About</a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">Admission</a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">Academic</a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">Rules & Regulations</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 font-serif">Examination</h3>
            <ul className="space-y-2 font-serif">
              <li>
                <a href="#" className="hover:text-gray-400">Examination Centre</a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">Student's Support</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 font-serif">Explore</h3>
            <ul className="space-y-2 font-serif">
              <li>
                <a href="#" className="hover:text-gray-40 font-serif0">Gallery</a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400 font-serif">Faculty</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 font-serif">Contact</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-gray-400 font-serif">Contact Us</a>
              </li>
            </ul>
          </div>
          <div className="mt-8 flex justify-center space-x-6">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            {/* <Facebook className="w-10 h-10 text-orange-600 hover:text-gray-400" /> */}
            <Image src={socialMedia3} alt="alt"  className="w-20 h-20  object-contain"   />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            {/* <Instagram className="w-10 h-10 text-orange-600 hover:text-gray-400" /> */}
            <Image src={socialMedia2} alt="alt"  className="w-20 h-20  object-contain" />

          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer ">
            <Image src={socialMedia1} alt="alt"  className="w-20 h-20  object-contain" />
          </a>

        </div>
        </div>

        {/* Social Media Icons */}


        <div className="border-t border-gray-700 mt-8 pt-6 text-center font-serif text-sm">
          <p>&copy; {new Date().getFullYear()} Jadhavar group of Institute's. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
