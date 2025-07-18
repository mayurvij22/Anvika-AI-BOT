import React from "react";

function Navbar() {
  return (
    <header className="w-full bg-indigo-700 text-white shadow-md py-4 px-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
        <h1 className="text-2xl font-bold tracking-wider">mayoZ</h1>

        <div className="mt-2 md:mt-0">
          <span className="bg-yellow-300 text-black px-3 py-1 rounded-md text-sm font-semibold animate-pulse">
            🚧 This site is under construction 🚧
          </span>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
