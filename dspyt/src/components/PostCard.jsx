import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";

import { useStore } from "../store";


const PostCard = ({ tokenId }) => {
    const [item, setItem] = useState();
    const contract = useStore((state) => state.contract);
    
    const initPost = async () => {
        const post = await contract.nft_token({
            token_id: tokenId
        });
        setItem(post);
    }
    
    useEffect(() => {
        initPost();
    }, []);

    if (item)
        return (
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
        )
    
    return (
        <div className='break-inside bg-slate-200 shadow-slate-600/40 my-6'>
            Loading...
        </div>
    )
}

export default PostCard;