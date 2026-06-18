import React, { Fragment } from "react";
import dayjs from "dayjs";

const Note = (prop) => {
  return (
    <div className="lg:grid lg:grid-cols-3 md:grid-cols-2 md:gap-10  lg:gap-10 lg:gap-y-20 lg:ml-8 grid grid-colos-1 gap-15 place-items-center">
      {prop.data?.map((i, _) => {
        return (
          <Fragment key={i?._id}>
            <div className="card bg-primary text-primary-content w-96  ">
              <div className="card-body">
                <h1 className="font-bold">{i?.title}</h1>
                <p className="font-medium">{i?.content}</p>
                <div className="card-actions justify-end">
                  <div className="mr-20 mt-6">
                    {dayjs(i?.createdAt).format("DD/MM/YYYY")}
                  </div>
                  <button
                    className="btn mt-3"
                    onClick={async () => {
                      if (confirm("Do you want to delete this note")) {
                        await prop.deletedata({ noteid: i?._id });
                      }
                    }}
                  >
                    Delete
                  </button>
                  <button
                    className="btn mt-3"
                    onClick={() => {
                      prop.setisSave(true);
                      prop.setupdate(true);
                      prop.setupdatedata?.(i);
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
