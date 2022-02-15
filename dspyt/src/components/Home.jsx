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
    return <div >
      <div> Loading... </div>
      </div>
  }

  return (
    <div className="container">
      <div className="row align-items-center my-5">
        <div className="col-lg-5">
          {
          comments.map((x) => (
            <div>
            <img
            className="img-fluid rounded mb-4 mb-lg-0"
            src={`https://${x.cid}.ipfs.dweb.link`}
            alt=""
          />
              {`cid:${x.cid}`}
            </div>
          ))
          }
        </div>
      </div>
    </div>
      );
    }

export default Home;
