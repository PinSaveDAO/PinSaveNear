import React from "react";

class Home extends React.Component {
  componentDidMount() {
    var url = process.env.REACT_APP_URL

    fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': process.env.REACT_APP_API
      }
    })
      .then(data => {
        return data.json();
      })
      .then(data => {
        this.setState({ ...data });
      });
  }

  render() {
    return (
      <div className="home">
        <div class="container">
          <div class="row align-items-center my-5">
            <div class="col-lg-7">
              <img
                class="img-fluid rounded mb-4 mb-lg-0"
                src="/dsp.png"
                alt=""
              />
            </div>
            <div class="col-lg-5">
              <h1 class="font-weight-light">Home</h1>
              <p>
                {JSON.stringify(this.state, null, 1)}
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
}

export default Home;