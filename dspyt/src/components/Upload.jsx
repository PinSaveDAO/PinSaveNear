import React, { useState } from "react";
import { NFTStorage, File } from 'nft.storage'
const axios = require('axios').default;
const client = new NFTStorage({ token: process.env.REACT_APP_API })

function Upload() {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div>
      <h1>Upload and Display Image</h1>
      {selectedImage && (
        <div>
        <img alt="not found" width="250px" src={URL.createObjectURL(selectedImage)} />
        <br />
        <button onClick={()=>setSelectedImage(null)}>Remove</button>
        </div>
      )}
      <br />
     
      <br /> 
      <input
        type="file"
        name="myImage"
        onChange={(event) => {
          console.log(event.target.files[0]);
          setSelectedImage(event.target.files[0]);
        }}
      />
    </div>
  );
};

export default Upload;