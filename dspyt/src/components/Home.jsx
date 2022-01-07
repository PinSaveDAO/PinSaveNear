import React, {useState, useEffect} from "react";
import axios from 'axios'

function Home() {
  const [comments, setComments] = useState([])
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchComments();
  }, [comments])

  const fetchComments = async()=>{
    const response=await axios({
      method: 'get',
      url: process.env.REACT_APP_URL,
      headers: {
        Authorization: process.env.REACT_APP_API
      }
    })
    console.log(response.status)
    console.log(response.data)
    setComments(response.data.value)
    setIsLoading(false)
  }

  if (isLoading) {
    return <div class="container">
      <div>Loading...</div>
      </div>
  }

  return (
    <div className="home">
    <div class="container">
      <div class="row align-items-center my-5">
        <div class="col-lg-5">
          <h1 class="font-weight-light">Home</h1>
          <p>
          {
          comments.map((x) => (
            <p> 
            <img
            class="img-fluid rounded mb-4 mb-lg-0"
            src={`https://${x.cid}.ipfs.dweb.link`}
            alt=""
          />
              {`cid:${x.cid}`}
            </p>
          ))
          }
            <br></br>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of
            type and scrambled it to make a type specimen book.
          </p>
        </div>
      </div>
    </div>
    </div>
      );
    }

export default Home;

