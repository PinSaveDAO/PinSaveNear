import React from "react";
import { Link } from "react-router-dom";

function Posts() {
  return (
    <div className="home">
      <div class="container">
        <Link to="/blog/introduction">
          <div class="row align-items-center my-5">
            <div class="col-lg-7">
              <img
                class="img-fluid rounded mb-4 mb-lg-0"
                src="dsp.png"
                alt=""
              />
            </div>
            <div class="col-lg-5">
              <h1 class="font-weight-light">Dspyt-NFTs</h1>
              <p>
              An interactive web application to upload and view images. The application interacts with Filecoin and IPFS. In particular, nft.storage provides api access for the applciation to store files.
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Posts;