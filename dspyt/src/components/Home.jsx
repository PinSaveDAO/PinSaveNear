import React, {useState, useEffect} from "react";
import axios from 'axios'

function Home() {
  const [comments, setComments] = useState([])
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchComments();
  }, [])

  const fetchComments = async()=>{
    const response = await axios({
      method: 'get',
      url: process.env.REACT_APP_URL,
      headers: {
        Authorization: process.env.REACT_APP_API
      }
    })
    setComments(response.data.value)
    setIsLoading(false)
  }

  if (isLoading) {
    return <div className="text-center mt-5">
      Loading...
      </div>
  }

  return (
    <div className="container">
      <div className="gallery-grid ">
        
          {
          comments.map((x) => (
            <div>
            <img
            className="img-fluid rounded mb-4 mb-lg-0"
            src={`https://${x.cid}.ipfs.dweb.link`}
            alt=""
          />
             <p> {`cid:${x.cid}`} </p>
            </div>
          ))
          }
        </div>
      </div>
    
      );
    }

export default Home;
