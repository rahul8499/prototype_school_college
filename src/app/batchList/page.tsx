"use client"; // Add this at the top to make this a Client Component

import React, { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import { useRouter,useSearchParams } from "next/navigation";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import debounce from "lodash.debounce"; // Install with `npm install lodash.debounce`
import ReactPaginate from "react-paginate";
import "./batchlist.css";

// Define the Batch type based on the API response
interface Batch {
  id: number;
  batchCode: string;
  duration: number;
  durationType: string;
  type: string;
  startDate: string; // Start date is returned as a string from the API
}

const BatchList: React.FC = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<number>(1); // Specify the type as `number`
  const [limit, setLimit] = useState<number>(10); // Specify the type as `number`
  const [totalRecords, setTotalRecords] = useState<number>(0); // Initialize as `number`
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Calculate number of pages
  const noOfPages = Math.ceil(totalRecords / limit);

  const handlePageChange = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected + 1); // Update current page
    updateSearchParams({ page: selectedItem.selected + 1 });

  };
  const searchParams = useSearchParams(); // `searchParams` is a ReadonlyURLSearchParams object
  useEffect(() => {
    const queryPage = searchParams?.get("page");
    const queryLimit = searchParams?.get("limit");

    if (queryPage) setCurrentPage(Number(queryPage));
    if (queryLimit) setLimit(Number(queryLimit));
  }, [searchParams]);

  const handleLimitChange = (e: any) => {
    updateSearchParams({
      limit: e,
    });
    setLimit(e);
    setCurrentPage(0);
    setIsDropdownOpen(!isDropdownOpen);
  };
  const updateSearchParams = (params: { [key: string]: any }) => {
    const updatedParams = new URLSearchParams(searchParams?.toString() || "");

    Object.entries(params).forEach(([key, value]) => {
      updatedParams.set(key, value.toString());
    });

    router.push(`?${updatedParams.toString()}`);
  };


  const [batches, setBatches] = useState<Batch[]>([]); // State to store batch data
  const [loading, setLoading] = useState<boolean>(true); // State for loading indicator
  const [error, setError] = useState<string | null>(null); // State for error handling

  const [searchTerm, setSearchTerm] = useState<string>(""); // State for search input

  const fetchBatches = async () => {
    setLoading(true);
    try {
      const response = await axios.get<{ batches: Batch[]; pagination: any }>(
        "/api/batch/batchGet",
        {
          params: {
            searchTerm, // Query parameter for filtering
            page: currentPage, // Pass `page` inside `params`
            pageSize: limit, // Pass `pageSize` inside `params`
          },
        }
      );

      if (response.data) {
        // setBatches(response.data.batches);
        const { batches, pagination } = response.data;
        setBatches(batches);

        setTotalRecords(pagination.totalItems);
      } else {
        throw new Error("Failed to fetch batches");
      }
    } catch (err) {
      setError("An error occurred while fetching the batches.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = debounce((term: string) => {
    setSearchTerm(term); // Update searchTerm state
    updateSearchParams({ search: term });


  }, 300);

  // Effect hook to fetch batches when the searchTerm changes
  useEffect(() => {
    fetchBatches(); // Fetch batches whenever the searchTerm changes
  }, [searchTerm,limit,currentPage]);
  // const fetchBatches = async ()=>{
  //   try {
  //     // const response = await axios.get<{ batches: Batch[] }>("/api/batch/batchGet");
  //     const response = await axios.get<{ batches: Batch[] }>('/api/batch/batchGet', {
  //       params: { searchTerm }, // Pass search term as query parameter
  //     });

  //     if (response) {
  //       setBatches(response.data.batches);
  //     }
  //     else{
  //       throw new Error('Failed to fetch batches');
  //     }

  //   } catch (err) {

  //   } finally {

  //       setLoading(false);

  //   }
  // }
  // const handleSearchChange = debounce((term: string) => {
  //   setSearchTerm(term);
  // }, 300);

  // console.log("batches--",batches);

  // useEffect(() => {
  //   fetchBatches();
  // }, [searchTerm]);

  const handleCreateClick = () => {
    router.push("/batchCreate");
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <button
          onClick={handleCreateClick}
          className="text-black bg-gray-100 px-4 py-2 rounded shadow-md hover:bg-gray-200 ml-auto block mt-4"
        >
          Batch Create
        </button>

        <h1 className="text-xl font-bold mt-8 mb-4">Batch List</h1>
        <input
          type="text"
          placeholder="Search by batch code"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          onChange={(e) => handleSearchChange(e.target.value)} // Handle search input
        />
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : (
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr className="text-center">
                  <th className="py-2 px-4 border-b">Batch Code</th>
                  <th className="py-2 px-4 border-b">Duration</th>
                  <th className="py-2 px-4 border-b">Duration Type</th>
                  <th className="py-2 px-4 border-b">Type</th>
                  <th className="py-2 px-4 border-b">Start Date</th>
                  <th className="py-2 px-4 border-b">Action</th>
                </tr>
              </thead>
              <tbody>
                {batches.length > 0 ? (
                  batches.map((batch) => (
                    <tr
                      key={batch.id}
                      className="bg-white border-b justify-center text-center dark:bg-gray-800 dark:border-gray-700"
                    >
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {batch.batchCode}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {batch.duration}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {batch.durationType}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {batch.type}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {new Date(batch.startDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <div className="flex  justify-center space-x-4">
                          {/* Edit Button */}
                          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600">
                            <FaEdit />
                            {/* <span>Edit</span> */}
                          </button>

                          {/* Delete Button */}
                          <button className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded shadow hover:bg-red-600">
                            <FaTrash />
                            {/* <span>Delete</span> */}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-4 text-gray-500">
                      No batches found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div className="mr-18" style={{ float: "right" }}>
        <div className="flex mt-2">
          <p className=" mt-1 ">Items per page:</p>

          <div className="relative inline-block">
            <button
              className="me-3 mb-3 md:mb-0 text-balck  border       font-medium text-sm px-3 py-1 text-center inline-flex items-center  "
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              type="button"
              style={{ border: " 2px solid balck" }}
            >
              {limit}
              <svg
                className={`w-2.5 h-2.5 ms-3 transition-transform transform ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5 5 1 1 5"
                />
              </svg>
            </button>

            <div
              className={`z-10 ${
                isDropdownOpen ? "" : "hidden"
              } absolute bottom-0 mb-6 bg-white divide-y divide-gray-100 rounded-lg   w-16 dark:bg-gray-700`}
            >
              <ul className="py-2text-base text-gray-700 dark:text-gray-200">
                <li>
                  <button
                    onClick={() => handleLimitChange(6)}
                    className="block px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full text-left"
                  >
                    6
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleLimitChange(10)}
                    className="block px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full text-left"
                  >
                    10
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleLimitChange(20)}
                    className="block px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full text-left"
                  >
                    20
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleLimitChange(50)}
                    className="block px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full text-left"
                  >
                    50
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <ReactPaginate
            previousLabel="<"
            nextLabel=">"
            breakLabel="..."
            pageCount={noOfPages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={2}
            onPageChange={handlePageChange}
            containerClassName="pagination"
            previousLinkClassName="pagination__link"
            nextLinkClassName="pagination__link"
            disabledClassName="pagination__link--disabled"
            activeClassName="pagination__link--active"
          />
        </div>
      </div>
    </div>
  );
};

export default BatchList;
