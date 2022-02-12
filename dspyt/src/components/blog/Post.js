import React, { useEffect } from "react";
import { useParams } from "react-router";

function Post() {
  let { postSlug } = useParams();

  useEffect(() => {
    // Fetch post using the postSlug
  }, [postSlug]);

  return (
    <div className="home">
      <div class="container">
        <h1 className="mt-5">Dspyt-NFTs</h1>
        <h6 className="mb-5"> {postSlug} </h6>
        <p>
        An interactive web application to upload and view images. The application interacts with Filecoin and IPFS. In particular, nft.storage provides api access for the applciation to store files.
        </p>
      </div>
    </div>
  );
}

export default Post;