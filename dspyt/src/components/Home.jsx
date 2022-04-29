import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useStore } from "../store";


function Home() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const contract = useStore((state) => state.contract);
  useEffect(() => {
    if (contract)
      fetchposts();
  }, [contract]);

  const fetchposts = async () => {
    const items = await contract.nft_tokens({
      limit: 50
    })
    setPosts(items);
    setIsLoading(false);
  };

  if (isLoading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <section aria-labelledby="products-heading" className="mt-8">
    <h2 id="products-heading" className="sr-only">
      Products
    </h2>
    <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:gap-x-8">
        {posts.map((item) => (
          <Link to={`/post/${item.token_id}`}>
            <div key={item.token_id} className="group">
            <div className="w-full aspect-w-1 aspect-h-1 rounded-lg overflow-hidden sm:aspect-w-2 sm:aspect-h-3">
            
                <img
                  className="w-full h-full object-center object-cover group-hover:opacity-75 aspect-[4/3]"
                  src={item.metadata.media}
                  alt=""
                />

              </div>
              <div className="pt-10 pb-4 text-center">
                  <h3 className="text-sm font-medium text-gray-900">
                    <a href={item.token_id}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {item.metadata.title}
                    </a>
                  </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
      </section>

  );
}

export default Home;
