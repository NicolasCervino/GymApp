import React from "react";

function RoutineBanner() {
  return (
    <div className="bg-[#252525] p-3">
      <h3 className="font-bold text-xl">Routine name</h3>
      <p className="text-base text-gray-400">Benchpress, Ball slams, Squat (Barbell), Deadlift (Barbell)</p>
      <button className="w-full p-2 my-2 bg-[#25ab75] hover:bg-[#1f8b60] text-lg font-semibold rounded-lg ">Start Routine</button>
    </div>
  );
}

export default RoutineBanner;
