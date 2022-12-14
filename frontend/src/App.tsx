import React from "react";
import Note from "./components/Note";

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
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
