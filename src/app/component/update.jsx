import React from "react";

const Update = (prop) => {
  return (
    <div>
      <form
        onSubmit={() => {
          prop.updateall();
          prop.fetchnotes();
          location.reload();
        }}
      >
        <div className="card bg-primary text-primary-content lg:w-120 h-70 lg:ml-120 mx-auto mt-30 w-85 ">
          <div className="card-body">
            <textarea
              value={prop.updatedata.title}
              required
              onChange={(e) => {
                prop.setupdatedata((prev) => ({
                  ...prev,
                title: e.target.value,
                }));
              }}
              placeholder="Title"
              className="h-8 rounded-[8px] text-centers focus:ring-3 focus:outline-none focus:ring-blue-500 border-[1px] border-gray-300 placeholder-amber-300"
            />

            <textarea
              required
              placeholder="Write your content here..."
              className="w-full max-w-[600px] h-32 p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-3 focus:ring-blue-500  placeholder-amber-300 mt-4"
              value={prop.updatedata.content}
              onChange={(e) => {
                prop.setupdatedata((prev) => ({
                  ...prev,
                  content: e.target.value,
                }));
              }}
            />

            <div className="card-actions justify-end">
              <button type="submit" className="btn mt-3">
                Save
              </button>
              <button
                className="btn mt-3"
                onClick={() => {
                  prop.setupdate(false);
                  prop.fetchnotes();
                  prop.setnote(true);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Update;
