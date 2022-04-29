import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useStore } from "../store";


function Home() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const contract = useStore((state) => state.contract);

  useEffect(() => {
    async function fetchposts(){
      const items = await contract.nft_tokens({
        limit: 10
      })
  
      setPosts(items);
      setIsLoading(false);
    }
    fetchposts();
  }, [contract]);

  if (isLoading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <section aria-labelledby="products-heading" className="max-w-7xl mx-auto overflow-hidden sm:px-6 lg:px-8">

      <div className="-mx-px border-l border-gray-200 grid grid-cols-2 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
        {posts.map((item) => (
          <Link to={`/post/${item.token_id}`}>
            <div key={item.token_id} className="group relative p-4 border-r border-b border-gray-200 sm:p-6">
            <div className="rounded-lg overflow-hidden bg-gray-200 aspect-w-1 aspect-h-1 group-hover:opacity-75">
            
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
