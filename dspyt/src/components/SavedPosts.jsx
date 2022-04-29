import { useState, useEffect } from "react";

import { useStore } from "../store";
import PostCard from "./PostCard";

const SavedPosts = () => {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const contract = useStore((state) => state.contract);
    
    useEffect(() => {
        if (contract)
            fetchposts();
    }, [contract]);

    const fetchposts = () => {
        let items = JSON.parse(localStorage.getItem("saved_posts")) || []
        setPosts(items);
        setIsLoading(false);
    };

    if (isLoading) {
        return <div className="text-center mt-5">Loading...</div>;
    }

    return (
        <section aria-labelledby="heading" className="max-w-7xl mx-auto overflow-hidden sm:px-6 lg:px-8">
            <div className="-mx-px border-l border-gray-200 grid grid-cols-2 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
                {posts.map((post) => <PostCard tokenId={post} />)} 
            </div>
        </section>
    );
}

export default SavedPosts