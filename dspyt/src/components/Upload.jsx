
import { useState,useRef } from "react";
import axios from 'axios'
import {SpinnerGap} from "phosphor-react";
import toast from "react-hot-toast";
function Upload() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [state, setState] = useState(false);
  const [data, setData] = useState();
  const [uploading,setUploading] = useState();
  const hiddenFileInput = useRef();
  async function str(){
    if (!uploading) {
      setUploading(true);
      const response = await axios({
        method: 'post',
        url: process.env.REACT_APP_UPLOAD,
        headers: {
          Authorization: process.env.REACT_APP_API,
          'Content-Type': 'image/*'
        },
        data: selectedImage
      }).then(()=>{ toast.success('Image Uploaded Successfully',{
        style: {
          borderRadius: '10px',
          background: '#222',
          color: '#fff',
        },
      });
      setUploading(false);
    })
      setData(response.data.value.cid)
    }
  }

  return (
    <div className="mx-3">
      <h1 className="text-center mt-5">Upload and Display Image</h1>
      <div className="text-center mt-5">
      
      <div 
      className="rounded-md border-dashed border-4 max-w-screen-md p-3 mx-auto">
      <input
        className="hidden"
        type="file"
        name="myImage"
        ref={hiddenFileInput}
        onChange={(event) => {
          if (event.target.files[0].type.includes("image")) {
            setSelectedImage(event.target.files[0]);
            setState(true);
          }
        }}
      />
      
      {selectedImage && 
        <img 
      src={ URL.createObjectURL(selectedImage)}
      alt=""
      className="rounded-md max-h-96 mt-4 mx-auto"
      />}
      <button onClick={(e) => {
        hiddenFileInput.current.click();
      }} className="text-emerald-50 font-semibold m-3 text-lg p-2 rounded-full  bg-sky-600">{selectedImage?"Replace file":"Add a File"}</button>
      </div>
      </div>
      {state && (
        <div className="text-center">
        <br />
        <button onClick={str} disabled={uploading} className=" rounded-full  p-3 m-1 text-2xl disabled:bg-emerald-700 disabled:opacity-60 bg-emerald-600 text-white">
            {uploading
            ?<SpinnerGap size={28} className="animate-spin my-auto mx-1"/>
            :"Submit"}
           </button>
        </div>
      )}

      {data && (
        <div > 
          {`Uploaded cid:${data}`}
        </div>
      )}
    </div>
  );
};

export default Upload;