import React, { useState, useEffect } from "react";
import axios from "axios";
import { CopySimple } from "phosphor-react";
import toast from "react-hot-toast";
function Home() {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    const response = await axios({
      method: "get",
      url: process.env.REACT_APP_URL,
      headers: {
        Authorization: process.env.REACT_APP_API,
      },
    });
    setComments(response.data.value);
    setIsLoading(false);
  };

  if (isLoading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <div className="mx-4 md:mx-16 lg:mx-32 my-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4">
        {comments.map((x, i) => (
          <div
            className="rounded-md bg-slate-50 shadow-slate-600/40 shadow-md"
            key={i}
          >
            <img
              className="my-4 mx-auto rounded-md max-h-60"
              src={`https://${x.cid}.ipfs.dweb.link`}
              alt=""
            />
            <button
              className="flex p-1 mx-auto my-2 rounded-full bg-blue-700 text-white"
              onClick={() => {
                navigator.clipboard.writeText(x.cid);
                toast("cID copied successfully", {
                  icon: "📋",
                  style: {
                    borderRadius: "10px",
                    background: "#222",
                    color: "#fff",
                  },
                });
              }}
            >
              Copy cID
              <CopySimple size={24} className="mx-2" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
