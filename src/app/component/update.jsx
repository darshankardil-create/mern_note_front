"use client";
import React from "react";
import toast from "react-hot-toast";
import api from "./../lib/axios.js";
import { useRef, useEffect } from "react";

const Update = (prop) => {
  const inbutton = useRef();
  const t1 = useRef();
  const t2 = useRef();

  useEffect(() => {
    if (
      inbutton.current?.innerText === "adding..." ||
      inbutton.current?.innerText === "Saving..."
    ) {
      inbutton.current.style.cursor = "not-allowed";
      inbutton.current.style.backgroundColor = "grey";
    }else{
      inbutton.current.style.cursor = "";
      inbutton.current.style.backgroundColor = "black";
    }
  }, [prop.loading]);

  async function updateall(e) {
    e.preventDefault();

    const url = `/notes/${prop.updatedata?._id}`;

    try {
      if (
        prop.updatedata?.title?.trim() === "" ||
        prop.updatedata?.content === ""
      ) {
        toast.error("Fields can't be empty");
        return;
      }

      prop.setloading(true);

      const updatedatapfput = {
        title: prop.updatedata?.title || "",
        content: prop.updatedata?.content || "",
      };

      await api.put(url, updatedatapfput);
      await prop.fetchnotes();
      prop.setupdate(false);
      prop.setnote(true);
    } catch (error) {
      console.log(error);
      if (error?.response?.status === 429) {
        setratelimiter(true);
        toast.error("Too many request please try again later");
        return;
      } else {
        console.log("error is their in deleting note");
      }
    } finally {
      prop.setloading(false);
      prop.setnote(true);
    }
  }

  async function handlepost(e) {
    try {
      e.preventDefault();

      if (!prop.value?.trim() || !prop.valuecon?.trim()) {
        toast.error("All fields are require");
        return;
      }
      prop.setloading(true);
      await prop.postdata();
      prop.setupdate(false);
      prop.setnote(true);
    } catch (error) {
      toast.error("error in handling setload", error);
      console.error(error);
    }
  }

  return (
    <>
      <form
        onSubmit={async (e) => {
          if (prop.isSave) {
            await updateall(e);
          } else {
            await handlepost(e);
          }
        }}
      >
        {prop.loading && (
          <div className="absolute h-screen w-full top-0 left-0 z-30 cursor-not-allowed"></div>
        )}
        <div className="card bg-primary text-primary-content lg:w-120 h-70 lg:ml-120 mx-auto mt-30 w-85 ">
          <div className="card-body">
            <textarea
              value={prop.updatedata?.title}
              ref={t1}
              required
              onChange={(e) => {
                prop.setvalue(e.target.value);
                prop.setfirst(true);
                prop.setupdatedata((prev) => ({
                  ...prev,
                  title: e.target.value,
                }));
              }}
              placeholder="Title"
              className="h-8 rounded-lg text-centers focus:ring-3 focus:outline-none focus:ring-blue-500 border border-gray-300 placeholder-amber-300 resize-none font-bold"
            />

            <textarea
              required
              ref={t2}
              placeholder="Write your content here..."
              className="w-full max-w-[600px] h-32 p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-3 focus:ring-blue-500 placeholder-amber-300 mt-4 font-medium"
              value={prop.updatedata?.content}
              onChange={(e) => {
                prop.setvaluecon(e.target.value);
                prop.setupdatedata((prev) => ({
                  ...prev,
                  content: e.target.value,
                }));
              }}
            />

            <div className="card-actions justify-end">
              <button
                type="button"
                className="btn mt-3"
                onClick={() => {
                  prop.setupdate(false);
                  prop.setnote(true);
                }}
              >
                Cancel
              </button>

              <button type="submit" className="btn mt-3" ref={inbutton}>
                {prop.isSave
                  ? prop.loading
                    ? "Saving..."
                    : "Save"
                  : prop.loading
                    ? "adding..."
                    : "add"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Update;
