import React from "react";
import './navbar.css'
import {
  ArrowDownToLine,
  BookOpenCheck,
  ChartNoAxesCombined,
  GraduationCap,
  HandHelping,
  Handshake,
  Images,
  MessageSquareReply,
  Newspaper,
  School,
  SquareUserRound,
  Store,
  Users,
  Youtube,
} from "lucide-react";
type Header3Props = {
  className?: string;
};
const Header3: React.FC<Header3Props> = ({ className }) => {
  return (
    <div className="between-md-lg">
      <div className="font-serif text-stone-700">
        <div className="mx-auto text-center max-w-full px-4 rounded-md">
          {/* Top Border */}
          <hr className="border-t lg:flex hidden border-gray-400 mb-4" />

          {/* Menu Items with Hover Effect */}
          <div className="lg:flex hidden justify-evenly flex-wrap">
            {[
              {
                icon: Store,
                label: "ABOUT",
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
                icon: ArrowDownToLine,
                label: " PAMPLET",
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
                label: "UDAN ",
                submenu: [
                  { label: "Udan1", link: "" },
                  { label: "Udan2", link: "" },
                ],
              },
              {
                icon: BookOpenCheck,
                label: "EXAM DESK",
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
                label: "MEDIA",
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
                label: "CONTACT",
              },
              {
                icon: MessageSquareReply,
                label: "FEEDBACKS",
              },
              // Add more menu items here
            ].map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center w-1/16 hover:text-orange-500 transition-colors cursor-pointer relative group"
              >
                {/* Main Menu Item */}
                {/* <item.icon className="h-8 w-8 text-gray-700 mb-2 group-hover:text-orange-500 transition-colors duration-300" /> */}
                <span className="text-sm  font-medium text-gray-800 group-hover:text-orange-500 transition-colors duration-300">
                  {item.label}
                </span>

                {/* Submenu */}
                {item.submenu && (
                  <div className="absolute z-50 top-full mt-2 left-1/2 transform -translate-x-1/2 bg-white   w-32 text-black text-sm rounded-md shadow-lg group-hover:opacity-100 group-hover:visible opacity-0 invisible transition-all">
                    {item.submenu.map((sub, subIndex) => (
                      <a
                        key={subIndex}
                        href={sub.link}
                        className="block hover:bg-gray-200 transition-colors"
                      >
                        {sub.label}

                        <hr className="border-dotted border-orange-600 my-1" />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Bottom Border */}
          <hr className="border-t lg:flex hiddenb order-gray-400 mt-4" />
        </div>
      </div>
    </div>
  );
};

export default Header3;
