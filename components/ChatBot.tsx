import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
const formSchema = z.object({
  fullname: z.string().min(1, "Full Name is required"),
  email: z.string().nonempty("Email Address is required"),
  mobileNumber: z
    .string()
    .nonempty("Mobile Number is required")
    .min(10, "Mobile Number must be at least 10 digits"),
});
const ChatBot = () => {
  type FormData = z.infer<typeof formSchema>;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      email: "",
      mobileNumber: "",
      // message: "",
    },
  });
  const [sendingMail, setSendingMail] = useState(false);

  const onSubmit = async (data: FormData) => {
    console.log("bvwh");

    const { fullname, email, mobileNumber } = data;
    setSendingMail(true);

    const response = await fetch("/api/sendMail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName: fullname,
        email,
        mobile: mobileNumber,
        // message,
      }),
    });

    const sendMail = await response.json();
    if (sendMail.success) {
      toast.success(
        `${sendMail.message}. Our team will contact you shortly. Thank you!`
      );
      handleUserSelection("Admission Information");
      reset();
    } else {
      toast.error(sendMail.message);
    }
    setSendingMail(false);
  };
  const [step, setStep] = useState(0); // Manage the flow of the chatbot steps
  const [message, setMessage] = useState("");

  const [isTyping, setIsTyping] = useState(true);
  const [dynamimessage, setDynamicMessage] = useState("");

  // Handle user selection and progress through chatbot steps
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const handleUserSelection = (selection: string) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      if (selection === "Admission Information") {
        setMessage("Which Program are you looking to build your career in?");
        setDynamicMessage(selection);
        setStep(2);
      } else if (selection === "Other Information") {
        setMessage("Fill The Form");
        setDynamicMessage(selection);

        setStep(1);
      } else if (selection === "Under Graduate") {
        setMessage("Please select a program:");
        setDynamicMessage(selection);

        setStep(3);
      } else if (selection === "Post Graduate") {
        setMessage("Please select a program:");
        setStep(3);
        setDynamicMessage(selection);
      } else if (selection === "B.Com." || selection === "BBA") {
        setMessage("Fill The Form");
        setStep(4);
      }
    }, 1000);
  };
  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic (e.g., send data to an API)
    setMessage("Thank you for your details! We will get back to you soon.");
    setStep(5);
  };

  const [dotsCount, setDotsCount] = useState(1);

  useEffect(() => {
    let interval: string | number | NodeJS.Timeout | undefined;
    if (isTyping) {
      interval = setInterval(() => {
        setDotsCount((prev) => (prev === 4 ? 1 : prev + 1)); // Cycle through 1, 2, 3 dots
      }, 200); // Adjust speed here
    }
    return () => clearInterval(interval); // Cleanup on unmount
  }, [isTyping]);
  useEffect(() => {
    const typingTimeout = setTimeout(() => {
      setIsTyping(false);
      setMessage(
        "Hello! I am Jhadhavar College Of Institute Chatbot, Are you looking for information regarding Admission at Jhadhavar College Of Institute or some other information?"
      );
    }, 2000); // Delay before showing the message

    return () => clearTimeout(typingTimeout); // Cleanup timeout on unmount
  }, []);

  return (
    <div className="relative w-full font-serif max-w-md lg:h-[520px] mx-auto bg-white rounded-2xl shadow-xl">
      <div className="overflow-auto h-96 p-4 pb-40 space-y-4">
        {/* Dynamically displayed message (right-aligned) */}
        {dynamimessage && (
          <div className="flex justify-start">
            <div className="p-2 bg-orange-600 text-white rounded-tl-lg rounded-br-lg ml-auto max-w-xs">
              {dynamimessage}
            </div>
          </div>
        )}
        {/* Static message (left-aligned) */}
        {message && (
          <div className="flex justify-start mt-4">
            <div className="p-2 bg-gray-200 rounded-tl-lg rounded-br-lg ">
              {message}
            </div>
          </div>
        )}

        {/* Typing indicator (Chatbot is typing...) */}
        {isTyping && (
          <div className="flex justify-start mt-4">
            <div className="p-3 bg-gray-200 rounded-lg">
              <span className="text-gray-700 font-medium">
                typing
                <span className="ml-1">
                  {Array(dotsCount).fill(".").join("")}
                </span>
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Chat Options */}
      <div className="absolute bottom-0 left-0 w-full p-4 bg-white border-t border-gray-300">
        {step === 0 && (
          <div className="space-y-2">
            <button
              onClick={() => handleUserSelection("Admission Information")}
              className=" text-black border-orange-600 border  py-2 px-4 rounded-full w-full hover:bg-orange-600 focus:outline-none transition"
            >
              Admission Information
            </button>
            <button
              onClick={() => handleUserSelection("Other Information")}
              className=" text-black  border-orange-600 border py-2 px-4 rounded-full w-full hover:bg-orange-600 focus:outline-none transition"
            >
              Other Information
            </button>
          </div>
        )}
        {step === 1 && (
          <form onSubmit={handleSubmitForm} className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="tel"
              placeholder="Mobile Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className=" text-black bg-orange-600 border border-orange-600 py-2 px-4 rounded-full w-full hover:bg-orange-500 focus:outline-none transition"
            >
              Submit
            </button>
          </form>
        )}
        {step === 2 && (
          <div className="space-y-2">
            <button
              onClick={() => handleUserSelection("Under Graduate")}
              className="bg-orange-600 text-white py-2 px-4 rounded-full w-full hover:bg-orange-500 focus:outline-none transition"
            >
              Under Graduate
            </button>
            <button
              onClick={() => handleUserSelection("Post Graduate")}
              className="bg-orange-600 text-white py-2 px-4 rounded-full w-full hover:bg-orange-500  focus:outline-none transition"
            >
              Post Graduate
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-2">
            <button
              onClick={() => handleUserSelection("B.Com.")}
              className="bg-orange-600 text-white py-2 px-4 rounded-full w-full hover:bg-orange-500  focus:outline-none transition"
            >
              B.Com.
            </button>
            <button
              onClick={() => handleUserSelection("BBA")}
              className="bg-orange-600 text-white py-2 px-4 rounded-full w-full hover:bg-orange-500  focus:outline-none transition"
            >
              BBA
            </button>
          </div>
        )}

        {step === 4 && (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              {...register("fullname")}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("fullname")}
            />
            {errors.fullname && (
              <p className="text-red-500 text-sm mt-1">
                {errors.fullname.message}
              </p>
            )}

            <input
              type="email"
              placeholder="Email"
              {...register("email")}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
            <input
              type="tel"
              placeholder="Mobile Number"
              {...register("mobileNumber")}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={sendingMail}
              className="w-full py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition duration-300 disabled:bg-gray-400"
            >
              {sendingMail ? "Sending..." : "Submit"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ChatBot;
