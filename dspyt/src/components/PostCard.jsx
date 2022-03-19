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
                <div
                    className="break-inside bg-slate-200 shadow-slate-600/40 my-6"

                >
                    <div className="bg-black/20 w-full">
                        <img
                            className="mx-auto max-h-60"
                            src={item.metadata.media}
                            alt=""
                        />
                    </div>
                    <h4 className="text-center font-bold my-2">{item.metadata.title}</h4>
                </div>
            </Link>
        )
    return (
        <div className='break-inside bg-slate-200 shadow-slate-600/40 my-6'>
            Loading...
        </div>
    )
}

export default PostCard