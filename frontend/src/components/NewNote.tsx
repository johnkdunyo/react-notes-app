import React, { useState } from "react";
import { toast } from "react-toastify";
import API from "../network/api";

const NewNote = () => {
  const [isAdding, setIsAdding] = useState<boolean>(false);

  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");

  const cancelAddingHandler = (e: { preventDefault: () => void }) => {
    // prevent page from reloading
    e.preventDefault();
    setIsAdding(false);
  };
  const saveNoteHandler = (e: React.FormEvent<HTMLFormElement>) => {
    // prevent page from reloading
    e.preventDefault();
    // api call to save
    console.log(title, body);
    API.post("/note", { title, body })
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          toast.success("Notes addedd succesefully");
          console.log("notes added succesefully");
          setIsAdding(false);
          setTimeout(() => {
            window.location.reload();
          }, 2500);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("An error occured, try again");
      });
    //   .finally(() => {
    //     window.location.reload();
    //   });
  };
  return (
    <div className="text-black bg-white border-2 border-gray-300 px-4  pb-2 rounded-lg ">
      {!isAdding ? (
        <div className="flex justify-center items-center h-full">
          <button
            className="border px-2 py-1 rounded-md flex justify-between items-center"
            onClick={() => setIsAdding(true)}
          >
            + Add Note
          </button>
        </div>
      ) : (
        <form
          className=" h-full w-full flex  flex-col justify-between pt-2"
          onSubmit={saveNoteHandler}
        >
          <div className="w-full flex flex-col pb-2 border-b my-2">
            <label htmlFor="">Title</label>
            <input
              type="text"
              placeholder="this is title"
              className="p-2  border rounded-sm "
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="w-full flex flex-col pb-2 border-b my-2">
            <label htmlFor="">Body</label>
            <textarea
              placeholder="this is a body"
              className="p-2  border rounded-sm "
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-between text-[12px] py-2 border-t border-gray-900">
            <button
              className="border px-2 py-1.5 rounded-md bg-red-600 text-white"
              onClick={cancelAddingHandler}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="border px-3 py-1.5 rounded-md bg-green-600 text-white"
            >
              Save
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default NewNote;
