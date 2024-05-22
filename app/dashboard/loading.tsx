import React from "react";

function Loading() {
  return (
    <div className="animate-pulse space-y-5">
      <div className="flex justify-between items-center">
        <div className="h-10 w-56 bg-gradient-dark rounded-md "></div>
        <div className="h-10 w-48 bg-gradient-dark rounded-md "></div>
      </div>

      <div className="border h-96 rounded-md bg-gradient-dark"></div>
    </div>
  );
}

export default Loading;
