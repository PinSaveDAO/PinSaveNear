import { useState, useEffect } from "react";
import axios from "axios";
import { useStore } from "../store";
import { CopySimple } from "phosphor-react";
import toast from "react-hot-toast";
function Home() {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const contract = useStore((state) => state.contract);
  useEffect(() => {
    if(contract)
    fetchComments();
  }, [contract]);

  const fetchComments = async () => {
    const items = await contract.nft_tokens({
      limit:10
    })
    setComments(items);
    setIsLoading(false);
  };

  if (isLoading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <div className="mx-4 md:mx-16 lg:mx-32 my-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4">
        {comments.map((item, i) => (
          <div
            className="rounded-md bg-slate-50 shadow-slate-600/40 shadow-md"
            key={i}
          >
            <img
              className="my-4 mx-auto rounded-md max-h-60"
              src={item.metadata.media}
              alt=""
            />
            <div className="mt-auto">
            <h4 className="text-center font-bold">{item.metadata.title}</h4>
            <button
              className="flex p-1 mx-auto my-2 rounded-full bg-blue-700/90 text-white"
              onClick={() => {
                navigator.clipboard.writeText(item.token_id);
                toast("Token ID copied successfully", {
                  icon: "📋",
                  style: {
                    borderRadius: "10px",
                    background: "#222",
                    color: "#fff",
                  },
                });
              }}
            >
              Copy Token ID
              <CopySimple size={24} className="mx-2" />
            </button>
              </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
