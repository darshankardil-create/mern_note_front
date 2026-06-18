"use client";

import React, { Fragment } from "react";
import Header from "./component/header.jsx";
import { useEffect, useState } from "react";
import Update from "./component/update.jsx";
import Note from "./component/note.jsx";
import Ratelimiter from "./component/ratelimiter.jsx";
import { toast } from "react-hot-toast";
import api from "./lib/axios.js";
import Image from "next/image.js";
import deleteimg from "./delete.png";

const Page = () => {
  const [note, setnote] = useState(true);
  const [update, setupdate] = useState(false);
  const [ratelimiter, setratelimiter] = useState(false);
  const [loading, setloading] = useState(true);
  const [swap, setswap] = useState(false);
  const [first, setfirst] = useState(true);
  const [firstpage, setfirstpage] = useState(false);
  const [isSave, setisSave] = useState(false);
  const [data, setdata] = useState([]);
  const [value, setvalue] = useState("");
  const [valuecon, setvaluecon] = useState("");
  const [updatedata, setupdatedata] = useState({});

  const fetchnotes = async () => {
    try {
      setloading(true);
      const res = await api.get("/notes");

      console.log(res?.data?.noteisthere);
      console.log(res);

      setdata(res.data?.noteisthere);
    } catch (error) {
      console.log("failed to fetch data");

      if (error?.response?.status === 429) {
        setratelimiter(true);
        toast.error("Too many request please try again later");
        return;
      } else {
        console.log("error is their in fetching");
      }
    } finally {
      setloading(false);
    }
  };
  useEffect(() => {
    if (data.length === 0) {
      setfirstpage(true);
      setfirst(false);
    } else {
      setfirstpage(false);
      setfirst(true);
    }
  }, [data]);

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
      console.log(dataofpost?.data);

      console.log("status:", dataofpost?.status);

      if (dataofpost?.status === 200) {
        toast.success("Added note successfully");
      }

      setvalue("");
      setvaluecon("");
    } catch (error) {
      console.log("error in posting note");

      if (error?.response?.status === 429) {
        setratelimiter(true);
        toast.error("Too many request please try again later");
        return;
      } else if (error?.response?.status === 500) {
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
      setloading(true);
      const dataofpost = await api.delete(url);
      console.log(dataofpost);

      if (dataofpost?.status === 200) {
        toast.success(" Note deleted successfully");
      }
    } catch (error) {
      if (error?.response?.status === 429) {
        setratelimiter(true);
        toast.error("Too many request please try again later");
        return;
      } else {
        console.log("error is their in deleting note");
      }
    } finally {
      setloading(false);
      fetchnotes();
    }
  }

  useEffect(() => {
    if (ratelimiter) {
      setnote(false);
    }
  }, [ratelimiter]);

  const findbyid = async ({ noteid }) => {
    try {
      const res = await api.get(`/notes/${noteid}`);

      console.log(res?.data);

      setupdatedata(res?.data?.n);

      console.log(res?.data?.n);
    } catch (error) {
      console.log("failed to fetch data");

      if (error?.response?.status === 429) {
        setratelimiter(true);
        toast.error("Too many request please try again later");
        return;
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
      {first && (
        <div
          data-theme="night"
          className={`min-h-screen ${loading ? "cursor-not-allowed" : ""}  ${
            swap
              ? "  bg-linear-to-r from-red-500 via-orange-500 via-yellow-400 via-green-400 via-blue-500 via-indigo-500 to-purple-600 "
              : "   bg-absolute inset-0 -z-10 h-full w-full items-center  [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]" // website name- bg.ibelick.com
          } `}
        >
          <Header
            setisSave={setisSave}
            savebool={setupdate}
            setnote={setnote}
            setswap={setswap}
            setfirstpage={setfirstpage}
            setfirst={setfirst}
            setupdatedata={setupdatedata}
          />

          {loading && (
            <div className=" text-green-300 flex justify-center items-center fixed  h-full w-full z-30">
              <span className="loading loading-ball loading-xs"></span>
              <span className="loading loading-ball loading-sm"></span>
              <span className="loading loading-ball loading-md"></span>
              <span className="loading loading-ball loading-lg"></span>
              <span className="loading loading-ball loading-xl"></span>
            </div>
          )}
          {ratelimiter && (
            <div className="left-1/5 top-1/2 absolute">
              <Ratelimiter />
            </div>
          )}
          <div className="pt-30">
            {note && (
              <Note
                setupdatedata={setupdatedata}
                deletedata={deletedata}
                setnote={setnote}
                findbyid={findbyid}
                setupdate={setupdate}
                setisSave={setisSave}
                data={data}
              />
            )}
          </div>

          {update && (
            <Update
              loading={loading}
              setloading={setloading}
              value={value}
              setupdate={setupdate}
              fetchnotes={fetchnotes}
              setnote={setnote}
              updatedata={updatedata}
              setupdatedata={setupdatedata}
              isSave={isSave}
              postdata={postdata}
              setvaluecon={setvaluecon}
              setvalue={setvalue}
              valuecon={valuecon}
              setfirst={setfirst}
            />
          )}
        </div>
      )}

      {firstpage && (
        <>
          <Header
            setupdatedata={setupdatedata}
            setisSave={setisSave}
            savebool={setupdate}
            setnote={setnote}
            setswap={setswap}
            setfirst={setfirst}
            setfirstpage={setfirstpage}
          />

          <div
            data-theme="night"
            className={`  ${
              swap //boolean
                ? " min-h-screen items-center justify-center flex bg-linear-to-r from-red-500 via-orange-500 via-yellow-400 via-green-400 via-blue-500 via-indigo-500 to-purple-600 "
                : "min-h-screen  justify-center flex bg-absolute inset-0 -z-10 h-full w-full items-center  [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] "
            } `}
          >
            <div
              className={` lg:h-70 lg:w-150 lg:text-[20px] lg:ml-15 text-[12.5px] w-100 ${
                swap
                  ? "text-black font-black text-xs"
                  : "text-white font-black "
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
                className=" cursor-pointer bg-blue-600 p-6 lg:ml-40 mt-20 rounded-lg border-none text-black ml-25"
                onClick={() => {
                  setisSave(false);
                  setfirst(true);
                  setupdate(true);
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
