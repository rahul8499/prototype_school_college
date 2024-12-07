

"use client";

import React, { useState } from "react";
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
  message: z.string().min(1, "Message is required"),
});

const ContactForm = () => {
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
      message: "",
    },
  });

  const [sendingMail, setSendingMail] = useState(false);

  const onSubmit = async (data: FormData) => {
    const { fullname, email, mobileNumber, message } = data;
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
        message,
      }),
    });

    const sendMail = await response.json();
    if (sendMail.success) {
      toast.success(sendMail.message);
      reset();
    } else {
      toast.error(sendMail.message);
    }
    setSendingMail(false);
  };

  return (
    <div
      id="contactUs"
      className="flex justify-center items-center my-7 bg-gray-50 py-8"
    >
      <div className="container px-6 py-8 bg-white shadow-xl rounded-xl  w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Side - Map */}
        <div className="w-full  ">
          <iframe
            src="https://www.google.com/maps?q=Prin.Dr.%20Sudhakar%20Jadhavar%20College%20MANAJI%20NAGAR%20NARHE%20Dhayari%20Pune%20Maharashtra%20411041&output=embed"
            width="100%"
            height="60%"
            style={{ border: 0 }}
            // allowFullScreen=""
            loading="lazy"
          ></iframe>
          <p className="text-gray-600 mt-4 font-serif">
            DR. SUDHAKAR JADHAVAR <br />
            ARTS, COMMERCE & SCIENCE COLLEGE, <br />
            MANAJI NAGAR, <br />
            NARHE-DHAYARI, <br />
            PUNE-411 041.
            <br /> CONTACT NO. 8888878858 <br />
            E-MAIL sjartscommcollege@gmail.com
          </p>
          {/* Directions Link */}
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=Prin.Dr.%20Sudhakar%20Jadhavar%20College%20MANAJI%20NAGAR,%20NARHE,%20Dhayari,%20Pune,%20Maharashtra%20411041"
            target="_blank"
            className="text-orange-600 font-semibold mt-2 inline-block font-serif"
          >
            Get Directions
          </a>
        </div>

        {/* Right Side - Contact Form */}
        <div className="w-full mt-20 lg:mt-0">
          <div className="text-center mb-6 font-serif">
            <h1 className="text-3xl font-bold text-gray-800">Get In Touch</h1>
            <p className="text-gray-600 mt-2">
            "If you need assistance or have any questions, please reach out to us via the form below."            </p>
          </div>

          <form
            className="space-y-6 font-serif"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Full Name Input */}
            <div className="w-full">
              <input
                type="text"
                placeholder="Full Name"
                className={`w-full p-4 border font-serif ${
                  errors.fullname ? "border-red-500" : "border-gray-300"
                } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500`}
                {...register("fullname")}
              />
              {errors.fullname && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.fullname.message}
                </p>
              )}
            </div>

            {/* Email Input */}
            <div className="w-full">
              <input
                type="email"
                placeholder="Email Address"
                className={`w-full p-4 border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500`}
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Mobile Number Input */}
            <div className="w-full">
              <input
                type="tel"
                placeholder="Mobile/WhatsApp Number"
                className={`w-full p-4 border ${
                  errors.mobileNumber ? "border-red-500" : "border-gray-300"
                } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500`}
                {...register("mobileNumber")}
              />
              {errors.mobileNumber && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.mobileNumber.message}
                </p>
              )}
            </div>

            {/* Message Textarea */}
            <div>
              <textarea
                placeholder="Message"
                className={`w-full p-4 border ${
                  errors.message ? "border-red-500" : "border-gray-300"
                } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 h-40`}
                {...register("message")}
              ></textarea>
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.message.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={sendingMail}
              className="w-full py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-500 transition duration-300 disabled:bg-gray-400"
            >
              {sendingMail ? "Sending..." : "Submit"}
            </button>
          </form>
        </div>
      </div>

      {/* Address Section */}
    </div>
  );
};

export default ContactForm;
