
import React, { useState } from "react";
import axios from 'axios'

function Upload() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [state, setState] = useState(false);
  const [data, setData] = useState();

  async function str(){
    const response = await axios({
      method: 'post',
      url: process.env.REACT_APP_UPLOAD,
      headers: {
        Authorization: process.env.REACT_APP_API,
        'Content-Type': 'image/*'
      },
      data: selectedImage
    })
    setData(response.data.value.cid)
  }

  return (
    <div>
      <h1 className="text-center mt-5">Upload and Display Image</h1>

      <input
        type="file"
        name="myImage"
        onChange={(event) => {
          setSelectedImage(event.target.files[0]);
          setState(true);
        }}
      />

      {state && (
        <div>
        <br />
        <button onClick={str}>Submit</button>
        </div>
      )}

      {data && (
        <div > 
          {data}
        </div>
      )}
    </div>
  );
};

export default Upload;