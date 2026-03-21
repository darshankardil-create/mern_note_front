import React from "react";

const Ratelimiter = () => {
  return (
    <div>
      <div className="card bg-red-500 text-primary-content lg:w-[1000px] z-5 absolute w-80 left-[10%] top-[10%] ">
        <div className="card-body items-center">
          <h2 className="card-title">ERROR !</h2>
          <p className="text-[20px]">
            Too many request please try again later!
          </p>
          <div className="card-actions justify-end"></div>
        </div>
      </div>
    </div>
  );
};

export default Ratelimiter;
