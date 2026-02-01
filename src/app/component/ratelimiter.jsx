import React from "react";

const Ratelimiter = () => {
  return (
    <div>
      <div className="card bg-red-500 text-primary-content w-[1000px] ml-[200px] mt-[20px] mx-auto">
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
