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
      toast.success(
        `${sendMail.message}. Our team will contact you shortly. Thank you!`
      );
      reset();
    } else {
      toast.error(sendMail.message);
    }
    setSendingMail(false);
  };

  return (
    <div>
      <div className="w-full font-serif">
        <div className="text-center mb-6 font-serif">
          <h1 className="text-3xl font-bold text-gray-800">Get In Touch</h1>
          <p className="text-gray-600 mt-2">
            "If you need assistance or have any questions, please reach out to
            us via the form below."
          </p>
        </div>

        <form
          className="lg:space-y-2 space-y-2 font-serif"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Full Name Input */}
          <div className="w-full">
            <input
              type="text"
              placeholder="Full Name"
              autoFocus
              autoComplete="off"
              className={`w-full lg:p-4 p-2 border font-serif ${
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
              autoComplete="off"

              className={`w-full lg:p-4 p-2 border ${
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
              autoComplete="off"

              className={`w-full lg:p-4 p-2 border ${
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
              autoComplete="off"

              className={`w-full lg:p-4 p-2 border ${
                errors.message ? "border-red-500" : "border-gray-300"
              } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 lg:h-40 h-28`}
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
            className="w-full py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition duration-300 disabled:bg-gray-400"
          >
            {sendingMail ? "Sending..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
