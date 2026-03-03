import React, { Fragment } from "react";
import dayjs from "dayjs";

const Note = (prop) => {
  return (
    <div className="lg:grid lg:grid-cols-3 lg:gap-110 lg:gap-y-20 lg:ml-8 grid grid-colos-1 gap-5">
      {prop.data.map((i, _) => {
        return (
          <Fragment key={i._id}>
            <div className="card bg-primary text-primary-content w-96  ">
              <div className="card-body">
                <h1>{i.title}</h1>
                <p>{i.content}</p>
                <div className="card-actions justify-end">
                  <div className="mr-20 mt-6">
                    {dayjs(i.createdAt).format("DD/MM/YYYY")}
                  </div>
                  <button
                    className="btn mt-3"
                    onClick={() => {
                      if (confirm("Do you want to delete this note")) {
                        prop.deletedata({ noteid: i._id });
                        prop.fetchnotes();
                      }
                    }}
                  >
                    delete
                  </button>
                  <button
                    className="btn mt-3"
                    onClick={() => {
                      prop.setupdate(true);
                      prop.findbyid({ noteid: i._id });
                      prop.setnote(false);
                    }}
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </Fragment>
        );
      })}
    </div>
  );
};

export default Note;
