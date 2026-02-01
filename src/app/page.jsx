"use client";

import React, { Fragment } from "react";
import Header from "./component/header.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import Valueofsave from "./component/valueofsave.jsx";
import Update from "./component/update.jsx";
import Note from "./component/note.jsx";
import Ratelimiter from "./component/ratelimiter.jsx";
import { toast } from "react-hot-toast";
import api from "./lib/axios.js";
import Image from "next/image.js";
import deleteimg from "./delete.png"


const Page = () => {
  const [note, setnote] = useState(true);
  const [valueofsave, setvalueofsave] = useState(false);
  const [update, setupdate] = useState(false);
  const [ratelimiter, setratelimiter] = useState(false);
  const [loading, setloading] = useState(true);
  const [swap, setswap] = useState(false);
  const [first, setfirst] = useState(true);
  const [firstpage, setfirstpage] = useState(false);

  const [data, setdata] = useState([]);
  const [value, setvalue] = useState("");
  const [valuecon, setvaluecon] = useState("");
  const [updatedata, setupdatedata] = useState({});

  //   useEffect(() => {

  //      if (data.length === null) return;   //  file:///Users/sanjaykardile/Desktop/Screenshot%202025-12-12%20at%202.26.25%20PM.png

  //   if (data.length === 0) {

  //     setfirstpage(true);
  //     setfirst(false);

  //   }
  // }, [data.length]);





  useEffect(() => {
    if (data.length === 0) {
      setfirstpage(true);
      setfirst(false);
    } else {
      setfirstpage(false);
      setfirst(true);
    }
  }, [data.length]);

  //    file:///Users/sanjaykardile/Downloads/Fetch%20Axios%20Get%20Post.pdf //open browser

  const fetchnotes = async () => {
    try {
      const res = await api.get("/notes");

      console.log(res.data.noteisthere);
      console.log(res);

      setdata(res.data.noteisthere);
    } catch (error) {
      console.log("failed to fetch data");

      if (error?.response?.status === 429) {
        setratelimiter(true);
      } else {
        console.log("error is their in fetching");
      }
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    fetchnotes();
  }, []);

  async function postdata() {
    const postdata = {
      title: value || "",
      content: valuecon || "",
    };

    const url = `/notes`;

    try {
      const dataofpost = await api.post(url, postdata);
      console.log(dataofpost.data);

      console.log("status:", dataofpost.status);

      if (dataofpost.status === 200) {
        toast.success("Added note successfully");
      }

      setvalue("");
      setvaluecon("");
    } catch (error) {
      console.log("error in posting note");

      if (error.response.status === 429) {
        setratelimiter(true);
      } else if (error.response.status === 500) {
        toast.error("Failed to create note internal server error");
      } else {
        console.log("error is their in posting");
        toast.error("Failed to create note server issue");
      }
    } finally {
      setloading(false);
      fetchnotes();
    }
  }

  async function deletedata({ noteid }) {
    const url = `/notes/${noteid}`;

    try {
      const dataofpost = await api.delete(url);
      console.log(dataofpost);

      if (dataofpost.status === 200) {
        // setdata((prev) => prev.filter((note) => note._id !== noteid));

        toast.success(" Note deleted successfully");
      }
    } catch (error) {
      if (error.response.status === 429) {
        setratelimiter(true);
      } else {
        console.log("error is their in deleting note");
      }
    } finally {
      setloading(false);
      fetchnotes();
    }
  }

  async function updateall() {
    const url = `/notes/${updatedata._id}`;

    try {
      const updatedatapfput = {
        title: updatedata.title || "",
        content: updatedata.content || "",
      };

      const dataofpost = await api.put(url, updatedatapfput);
      console.log(dataofpost.data);
    } catch (error) {
      if (error.response.status === 429) {
        setratelimiter(true);
      } else {
        console.log("error is their in deleting note");
      }
    } finally {
      setloading(false);
      fetchnotes();
    }
  }

  const findbyid = async ({ noteid }) => {
    try {
      const res = await api.get(`/notes/${noteid}`);

      console.log(res.data);

      setupdatedata(res.data.n);

      console.log(res.data.n);
    } catch (error) {
      console.log("failed to fetch data");

      if (error.response.status === 429) {
        setratelimiter(true);
      } else {
        console.log("error is their in fetching data by id");
      }
    } finally {
      setloading(false);
      fetchnotes();
    }
  };

  return (
    <>
      {first && ( // ✅ 3. Parentheses are used ONLY for grouping multi-line JSX
        <div
          data-theme="night"
          className={` " min-h-screen" ${
            swap //boolean
              ? " min-h-screen bg-gradient-to-r from-red-500 via-orange-500 via-yellow-400 via-green-400 via-blue-500 via-indigo-500 to-purple-600 "
              : " min-h-screen bg-absolute inset-0 -z-10 h-full w-full items-center  [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]" // website name- bg.ibelick.com
          } `}
        >
          {/* <div  className="min-h-screen bg-gradient-to-r from-yellow-300 via-blue-500 via-pink-400 via-orange-400 via-purple-400 to-red-500) "></div> */}

          <Header
            savebool={setvalueofsave}
            setnote={setnote}
            setswap={setswap}
            setfirstpage={setfirstpage}
            setfirst={setfirst}
          />

          {loading && (
            <div className="ml-160 mt-100">
              <span className="loading loading-ball loading-xs"></span>
              <span className="loading loading-ball loading-sm"></span>
              <span className="loading loading-ball loading-md"></span>
              <span className="loading loading-ball loading-lg"></span>
              <span className="loading loading-ball loading-xl"></span>
            </div>
          )}

          {ratelimiter && <Ratelimiter />}

          <div className="grid grid-cols-3 gap-4 mt-10">
            {note && (
              <Note
                deletedata={deletedata}
                fetchnotes={fetchnotes}
                setnote={setnote}
                findbyid={findbyid}
                setupdate={setupdate}
                data={data}
              />
            )}
          </div>

          {valueofsave && (
            <Valueofsave
              setvalueofsave={setvalueofsave}
              fetchnotes={fetchnotes}
              postdata={postdata}
              setvaluecon={setvaluecon}
              setvalue={setvalue}
              value={value}
              valuecon={valuecon}
              setfirst={setfirst}
              setnote={setnote}
            />
          )}

          {update && (
            <Update
              updateall={updateall}
              setupdate={setupdate}
              fetchnotes={fetchnotes}
              setnote={setnote}
              updatedata={updatedata}
              setupdatedata={setupdatedata}
            />
          )}
        </div>
      )}

      {firstpage && (
        <>
          <Header
            savebool={setvalueofsave}
            setnote={setnote}
            setswap={setswap}
            setfirst={setfirst}
            setfirstpage={setfirstpage}
          />

          <div
            data-theme="night"
            className={`  ${
              swap //boolean
                ? " min-h-screen items-center justify-center flex bg-gradient-to-r from-red-500 via-orange-500 via-yellow-400 via-green-400 via-blue-500 via-indigo-500 to-purple-600 "
                : "min-h-screen items-center justify-center flex bg-absolute inset-0 -z-10 h-full w-full items-center  [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] "
            } `}
          >
            <div
              className={` lg:h-70 lg:w-150 lg:text-[20px] lg:ml-15 text-[12.5px] w-100 ${
                swap
                  ? "text-black font-[900] text-xs"
                  : "text-white font-[900] "
              } `}
            >
              <Image
                height="90"
                width="100"
                alt="no Note"
                src={deleteimg}
                className="lg:ml-60 mb-10 ml-35"
              />
              Your first note is the beginning of your ideas taking shape
              <button
                className=" cursor-pointer bg-blue-600 p-6 lg:ml-40 mt-20 rounded-[8px] border-none text-black ml-25"
                onClick={() => {
                  setfirst(true);
                  setvalueofsave(true);
                  setfirstpage(false);
                  setnote(false);
                }}
              >
                Create your first note
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Page;
