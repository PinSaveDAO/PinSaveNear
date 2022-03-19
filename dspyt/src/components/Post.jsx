import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ArrowSquareOut, Tray } from "phosphor-react";
import { useStore } from "../store";


const Post = () => {
  const params = useParams();
  const [userpost, setUserPost] = useState([]);
  const [saved, setSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const contract = useStore((state) => state.contract);
  useEffect(() => {
    if (contract)
      fetchPost();
  }, [contract]);

  const fetchPost = async () => {
    const item = await contract.nft_token({
      token_id: params.token_id
    })
    let posts = JSON.parse(localStorage.getItem("saved_posts")) || [];
    if (posts.includes(item.token_id))
      setSaved(true);
    setUserPost(item);
    setIsLoading(false);

  };
  const savePost = async () => {
    if (!saved) {
      let posts = JSON.parse(localStorage.getItem("saved_posts")) || [];
      posts.push(userpost.token_id);
      localStorage.setItem("saved_posts", JSON.stringify(posts))
      setSaved(true);
    }
    else {
      let posts = JSON.parse(localStorage.getItem("saved_posts")) || [];
      let filteredPosts = posts.filter((val, i) => val !== userpost.token_id)

      localStorage.setItem("saved_posts", JSON.stringify(filteredPosts));
      setSaved(false);
    }
  }
  if (isLoading)
    return (
      <div className="text-center mt-24">
        <h1 className="text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-blue-500 to-purple-600">
          Welcome
        </h1>
        <h2 className="text-2xl md:text-4xl font-bold">Loading...</h2>
      </div>
    )

  if (userpost)
    return (
      <div className="flex flex-col lg:flex-row mx-auto justify-center mt-24">
        <div className="w-screen lg:w-auto bg-black/60 lg:bg-transparent">
          <img style={{ maxHeight: "50vh", maxWidth: "50vw" }} className=" mx-auto lg:mx-0 shadow-md" src={userpost.metadata.media} alt="" />
        </div>
        <div className="mx-4 lg:ml-12 p-4 rounded-md shadow-md lg:w-full flex-col">
          <div>
            <h1 className="font-bold">{userpost.metadata.title}</h1>
            <h3>
              Owned by <span className="font-semibold">{userpost.owner_id}</span>
            </h3>
            <h5 onClick={() => {
              window.open(`https://explorer.testnet.near.org/accounts/${userpost.owner_id}`);
            }} className="mb-4 flex text-black/50">View on Explorer
              <ArrowSquareOut className="my-auto mx-3" />
            </h5>
            <p>
              Description:
              <br />
              <span className="italic">
                {userpost.metadata.description}
              </span>
            </p>
          </div>
          <button onClick={() => savePost()} className="flex mt-12 lg:mt-48 font-bold text-lg rounded-lg p-2 transition-all duration-500 bg-gradient-to-l to-blue-200 via-emerald-300 from-blue-500 bg-size-200 bg-pos-0 hover:bg-pos-100">
            <Tray className="my-auto h-6 w-6 mr-2" /> {!saved ? "Save for later" : "Unsave post"}
          </button>
        </div>
      </div>
    )

  return (
    <div className="text-center mt-24">
      <h1 className="text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-blue-500 to-purple-600">
        404
      </h1>
      <h2 className="text-2xl md:text-4xl font-bold">Post not found</h2>
    </div>
  )
}

export default Post