import React, { useState } from "react";
import { SlOptionsVertical } from "react-icons/sl";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

const Note = () => {
  const [openOptions, setOpenOptions] = useState<boolean>(false);
  return (
    <div
      className={`flex flex-col  justify-between border-2 border-gray-300 px-4 pt-4 pb-1 rounded-lg  relative ${
        openOptions ? "bg-gray-200" : "bg-white"
      }`}
    >
      <div className="absolute right-1 top-1  inline-flex">
        <button
          className="p-1 rounded  inline-flex justify-center items-center group"
          onClick={() => setOpenOptions((prev) => !prev)}
        >
          <SlOptionsVertical />
        </button>
        <div
          className={`${
            !openOptions && "hidden"
          } absolute  -right-1 top-full mt-1 w-28 drop-shadow-lg rounded z-5 border-2 border-gray-100 bg-white `}
        >
          <div className="flex flex-col items-start  py-1.5 rounded w-full  gap-1 text-base">
            <button className="w-full px-2 text-left border-b hover:bg-gray-200 flex items-center">
              <CiEdit color="green" /> <span className="ml-2">Edit</span>
            </button>
            <button className="w-full px-2 text-left border-b hover:bg-gray-200 flex items-center">
              <MdDelete color="red" /> <span className="ml-2">Delete</span>
            </button>
          </div>
        </div>
      </div>
      <div className="">
        <h1 className="border-b border-black font-bold">
          This is the title This is the title This is the title{" "}
        </h1>
        <p className="mt-3 ">
          this is the body.. In general, the position of a sticky navbar is
          relative (it will scroll down like other elements) until it crosses a
          specified threshold, then ...
        </p>
      </div>
      <div className="flex justify-between text-[12px] mt-2 border-t border-gray-900">
        <div className="flex flex-col">
          <p className="text-gray-600">created on</p>
          <p>Tue 25th Dec</p>
        </div>
        <div className="flex flex-col">
          <p className="text-gray-600">updated on</p>
          <p>Tue 25th Dec</p>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="h-screen w-screen ">
      <div className="flex flex-col justify-between h-full  ">
        <div className="sticky top-0 z-50 bg-white ">
          <h1 className="text-center my-5 font-bold">React Notes App</h1>
        </div>
        <main className="container mx-auto h-full p-5 ">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <Note />
            <Note />
            <Note />
            <Note />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
