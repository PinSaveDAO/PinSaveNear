
import React, { useState } from "react";
//import { NFTStorage, File } from 'nft.storage'
import axios from 'axios'
//const client = new NFTStorage({ token: process.env.REACT_APP_SAPI })

//const endpoint = 'https://api.nft.storage' // the default
//const token =  process.env.REACT_APP_SAPI // your API key from https://nft.storage/manage

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
    //console.log(response.data.value.cid)
    setData(response.data.value.cid)
  }

/*   async function store(){
    //const storage = new NFTStorage({ endpoint, token })
    const cid = await client.storeDirectory([
      selectedImage
      //new File([selectedImage], { type: 'image/*' })
    ])

     const metadata = await client.store({
      name: selectedImage.name,
      description: 'Pin is not delicious beef!',
      image: selectedImage
      //new File([selectedImage], { type: 'image/*' })
    })
    console.log(cid)
    setData(cid)
  } */

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
          //console.log(event.target.files[0]);
          //console.log(event.target.files[0].name);
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
        <div> 
          {data}
        </div>
      )}
    </div>
  );
};

export default Upload;