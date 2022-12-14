import React, { useState } from "react";
import { SlOptionsVertical } from "react-icons/sl";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { INote } from "../types";
import { formatDate } from "../utils/utils";
import API from "../network/api";
import { toast } from "react-toastify";

const Note = ({ id, title, body, createdAt, updatedAt }: INote) => {
  const [openOptions, setOpenOptions] = useState<boolean>(false);
  const [isEditting, setIsEditting] = useState<boolean>(false);

  // set default to title and body
  const [noteTitle, setNoteTitle] = useState<string>(title);
  const [noteBody, setNoteBody] = useState<string>(body);

  const editNoteHandler = () => {
    // set editting to true and close the options menu
    setIsEditting(true);
    setOpenOptions(false);
  };

  const cancelEdittingHandler = () => {
    // close editting
    setIsEditting(false);
    // reset title and body to default
    setNoteTitle(title);
    setNoteBody(body);
  };

  const saveNoteHandler = () => {
    // close editting
    setIsEditting(false);
    // api call to save
    API.put(`/note/${id}`, { title: noteTitle, body: noteBody })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          toast.success("Notes updated succesefully");
          console.log("udpated succesefully");
        }
      })
      .catch((err) => {
        console.log(err.response.data.error);
        if (
          String(err.response.data.error).includes("UNIQUE constraint failed:")
        ) {
          toast.error("Title exists already, please change it");
        }
        setIsEditting(true);
        setNoteBody(body);
        setNoteTitle(title);
        // if(err.response.data)
      });
    // .finally(() => {
    //   window.location.reload();
    // });
  };

  const deleteNoteHandler = () => {
    // delete note
    API.delete(`/note/${id}`)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          console.log("note delleted succesefully");
        }
      })
      .catch((error) => {
        console.log(error);
      });
    setOpenOptions(false);
    window.location.reload();
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
              <MdDelete color="red" />{" "}
              <span className="ml-2" onClick={deleteNoteHandler}>
                Delete
              </span>
            </button>
          </div>
        </div>
      </div>
      {isEditting ? (
        <>
          <div className="pr-2 text-black">
            <input
              className="border-b border-black font-bold w-full p-2 placeholder:text-black"
              placeholder="This is the title This is the title This is the title"
              value={noteTitle}
              onChange={(e) => setNoteTitle(e.target.value)}
              required
            />
            <textarea
              className="mt-3 w-full p-2 "
              value={noteBody}
              rows={5}
              onChange={(e) => setNoteBody(e.target.value)}
              required
            />
          </div>
        </>
      ) : (
        <div className="">
          <h1 className="border-b border-gray-300 font-bold pb-1">
            {noteTitle}
          </h1>
          <p className="mt-3 ">{noteBody}</p>
        </div>
      )}

      {isEditting ? (
        <div className="flex justify-between text-[12px] py-2 border-t border-gray-900">
          <button
            className="border px-2 py-1.5 rounded-md bg-red-600 text-white"
            onClick={cancelEdittingHandler}
          >
            Cancel
          </button>
          <button
            className="border px-3 py-1.5 rounded-md bg-green-600 text-white"
            onClick={saveNoteHandler}
          >
            Save
          </button>
        </div>
      ) : (
        <div className="flex justify-between text-[12px] mt-2 border-t border-gray-900">
          <div className="flex flex-col">
            <p className="text-gray-600">created on</p>
            <p>{formatDate(createdAt)}</p>
          </div>
          <div className="flex flex-col">
            <p className="text-gray-600">updated on</p>
            <p>{formatDate(updatedAt)}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Note;
