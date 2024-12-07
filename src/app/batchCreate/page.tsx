"use client";

import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Navbar from "../../../components/Navbar";
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Import the styles
import { FaArrowLeft } from "react-icons/fa";

// Define the form schema using Zod
const formSchema = z.object({
  batchCode: z.string().min(1, "Batch Code is required"),
  duration: z.string().min(1, "Duration is required"),
  durationType: z.string().min(1, "Please select a duration type"),
  type: z.string().min(1, "Please select a type"),
  startDate: z.string().min(1, "Start Date is required"),
});

type FormData = z.infer<typeof formSchema>;

export default function BatchCreate() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch("/api/batch/batchCreate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        toast.success(`Batch created successfully: ${result.batch.id}`);
        router.push('/batchList');

      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An unexpected error occurred.");
    }
  };
const handleBack =()=>{
  router.push('/batchList')
}
  return (
    <>
    <ToastContainer/>
      <Navbar />
      <div className="p-6">
<div className="flex">
<button
              type="button"
              className="bg-slate-300  text-white px-4 py-2 rounded hover:bg-slate-300"
              onClick={handleBack}
            >
                    <FaArrowLeft /> {/* Left arrow icon */}

                    </button>
        <h1 className="text-2xl font-bold  ml-2">Create Batch</h1>

</div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-6 gap-4">
            {/* Batch Code */}
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="batchCode" className="block text-sm font-medium">
                Batch Code
              </label>
              <input
                id="batchCode"
                {...register("batchCode")}
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="Enter batch code"
              />
              {errors.batchCode && (
                <p className="text-red-500 text-sm">{errors.batchCode.message}</p>
              )}
            </div>

            {/* Duration and Duration Type */}
            <div className="col-span-6 sm:col-span-3 grid grid-cols-2 gap-4">
              {/* Duration */}
              <div>
                <label htmlFor="duration" className="block text-sm font-medium">
                  Duration
                </label>
                <input
                  id="duration"
                  {...register("duration")}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="Enter duration"
                />
                {errors.duration && (
                  <p className="text-red-500 text-sm">{errors.duration.message}</p>
                )}
              </div>

              {/* Duration Type */}
              <div>
                <label htmlFor="durationType" className="block text-sm font-medium">
                  Duration Type
                </label>
                <select
                  id="durationType"
                  {...register("durationType")}
                  className="w-full border border-gray-300 bg-white rounded px-3 py-2"
                >
                  <option value="">Select Duration Type</option>
                  <option value="Year">Year</option>
                  <option value="Month">Month</option>
                  <option value="Day">Day</option>
                </select>
                {errors.durationType && (
                  <p className="text-red-500 text-sm">{errors.durationType.message}</p>
                )}
              </div>
            </div>

            {/* Type */}
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="type" className="block text-sm font-medium">
                Type
              </label>
              <select
                id="type"
                {...register("type")}
                className="w-full border border-gray-300 bg-white rounded px-3 py-2"
              >
                <option value="">Select Batch Type</option>
                <option value="Nurture">Nurture</option>
                <option value="Enthuse">Enthuse</option>
                <option value="Leader">Leader</option>
              </select>
              {errors.type && (
                <p className="text-red-500 text-sm">{errors.type.message}</p>
              )}
            </div>

            {/* Start Date */}
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="startDate" className="block text-sm font-medium">
                Start Date
              </label>
              <input
                type="date"
                id="startDate"
                {...register("startDate")}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
              {errors.startDate && (
                <p className="text-red-500 text-sm">{errors.startDate.message}</p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div>
          <button
              type="submit"
              className="bg-white  text-black border px-4 py-2 rounded hover:bg-slate-100"
              onClick={handleBack}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ml-2"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
