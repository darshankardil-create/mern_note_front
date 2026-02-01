"use client";

import React from "react";

import { toast } from "react-hot-toast";

import { useState, useRef, useEffect } from "react";

const Valueofsave = ({
  valuecon,
  value,
  postdata,
  setvalueofsave,
  setnote,
  fetchnotes,
  setvalue,
  setfirst,
  setvaluecon,
}) => {
  const [load, setload] = useState(false);

  const inbutton = useRef();

  useEffect(() => {
    console.log(inbutton.current.innerText);

    if (inbutton.current.innerText === "...adding") {
      inbutton.current.style.cursor = "not-allowed";
      inbutton.current.style.backgroundColor = "grey";
    }
  }, [load]);

  async function handleevent(e) {
    e.preventDefault(); //if status 200 then setnote(true)

    if (!value?.trim() || !valuecon?.trim()) {
      toast.error("All fields are require");

      return;
    }

    setload(true);

    try {
      await postdata();

      if (load === false) {
        setvalueofsave(false);
        setnote(true);

        fetchnotes();
      }
    } catch (error) {
      toast.error("error in handling setload");
    }
  }

  return (
    <div>
      <form
        onSubmit={(e) => {
          handleevent(e);
        }}
      >
        <div className="card bg-primary text-primary-content lg:w-120 lg:h-70 lg:ml-120 mx-auto lg:mt-50 mt-40 w-85">
          <div className="card-body">
            <textarea
              onChange={(e) => {
                setvalue(e.target.value);
                setfirst(true);
              }}
              placeholder="Title"
              className=" h-8 rounded-[8px] text-centers  focus:ring-3 focus:outline-none   focus:ring-blue-500 border-[1px] border-gray-300 placeholder-amber-300"
            />

            <textarea
              onChange={(e) => {
                setvaluecon(e.target.value);
              }}
              placeholder="Write your content here..."
              className="w-full max-w-[600px] h-32 p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-3 focus:ring-blue-500  placeholder-amber-300 mt-4"

              //  required
            />

            <div className="card-actions justify-end">
              <button
                type="submit"
                ref={inbutton}
                className="btn mt-3 border-none"
              >
                {load ? "...adding" : "added"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Valueofsave;