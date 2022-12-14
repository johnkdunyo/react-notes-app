import React, { useState } from "react";
import { SlOptionsVertical } from "react-icons/sl";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

const Note = () => {
  const [openOptions, setOpenOptions] = useState<boolean>(false);
  const [isEditting, setIsEditting] = useState<boolean>(false);

  const [title, setTitle] = useState<string>(
    "This is a title, it is a nice ttile"
  );
  const [body, setBody] = useState<string>(
    "this is the body.. In general, the position of a sticky navbar is relative it will scroll down like other elements until it crosses a specified threshold, then ..."
  );

  const editNoteHandler = () => {
    setIsEditting(true);
    setOpenOptions(false);
  };

  return (
    <div
      className={`flex flex-col  justify-between border-2 border-gray-300 px-4 pt-4 pb-2 rounded-lg  relative ${
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
            <button
              className="w-full px-2 text-left border-b hover:bg-gray-200 flex items-center"
              onClick={editNoteHandler}
            >
              <CiEdit color="green" /> <span className="ml-2">Edit</span>
            </button>
            <button className="w-full px-2 text-left border-b hover:bg-gray-200 flex items-center">
              <MdDelete color="red" /> <span className="ml-2">Delete</span>
            </button>
          </div>
        </div>
      </div>
      {isEditting ? (
        <form>
          <div className="pr-2 text-black">
            <input
              className="border-b border-black font-bold w-full p-2 placeholder:text-black"
              placeholder="This is the title This is the title This is the title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              className="mt-3 w-full p-2 "
              value={body}
              rows={5}
              onChange={(e) => setBody(e.target.value)}
            />
          </div>
        </form>
      ) : (
        <div className="">
          <h1 className="border-b border-gray-300 font-bold pb-1">{title}</h1>
          <p className="mt-3 ">{body}</p>
        </div>
      )}

      {isEditting ? (
        <div className="flex justify-between text-[12px] py-2 border-t border-gray-900">
          <button
            className="border px-2 py-1.5 rounded-md bg-red-600 text-white"
            onClick={() => setIsEditting(false)}
          >
            Cancel
          </button>
          <button className="border px-3 py-1.5 rounded-md bg-green-600 text-white">
            Save
          </button>
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default Note;
