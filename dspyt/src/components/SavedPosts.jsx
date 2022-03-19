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
        <div className="mx-4 md:mx-16 lg:mx-32 mt-12">
            <div className="md:masonry-2-col lg:masonry-3-col xl:masonry-4-col box-border mx-auto before:box-inherit after:box-inherit">
                {posts.map((post, i) => <PostCard tokenId={post} key={i} />)}
            </div>
        </div>
    );
}

export default SavedPosts