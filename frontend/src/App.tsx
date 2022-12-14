import React, { useEffect, useState } from "react";
import NewNote from "./components/NewNote";
import Note from "./components/Note";
import API from "./network/api";
import { INote } from "./types";

function App() {
  const [notes, setNotes] = useState<INote[]>();

  // get all notes
  const getAllNotes = async () => {
    API.get("/note")
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          console.log(res.data.notes);
          setNotes(res.data.notes.reverse());
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getAllNotes();
  }, []);

  console.log("notes->", notes);

  return (
    <div className="h-screen w-screen ">
      <div className="flex flex-col justify-between h-full  ">
        <div className="sticky top-0 z-50 bg-white ">
          <h1 className="text-center my-5 font-bold">React Notes App</h1>
        </div>
        <main className="container mx-auto h-full p-5 ">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <NewNote />
            {notes &&
              notes.map((note) => (
                <Note
                  key={note.id}
                  id={note.id}
                  title={note.title}
                  body={note.body}
                  createdAt={note.createdAt}
                  updatedAt={note.updatedAt}
                />
              ))}
            {/* <Note
              id={1}
              title="this is just a title"
              body="This is just body"
              createdAt="Tue Dec 25th"
              updatesAt="Tue Dec 26th"
            />
            <Note
              id={2}
              title="this is just another title"
              body="This is just another body"
              createdAt="Tue Jan 25th"
              updatesAt="Tue Jan 26th"
            /> */}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
