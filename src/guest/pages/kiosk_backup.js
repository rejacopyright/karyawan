import React from 'react'
import Webcam from "react-webcam"
import con from "../../con/api"

class KiosK extends React.Component {
  state = {
    images:[]
  }
  tick() {
    this.setState({ images: this.webcamRef.getScreenshot() });
  }
  onUserMedia() {
    this.timer = setInterval( () => this.tick(), 0 );
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  render () {
    return (
      <div className="content-page ou">
        <div className="content">
          <div className="container-fluid col-md-10 offset-md-1">
            <div className="row">
              <div className="col-3 pt-3">
                {
                  [1,2,3].map(key => (
                    <div className="card radius-10 oh shadow-xs" key={key}>
                      <div className="card-body p-0">
                        <img src={`${con.img}/banner/${key}.jpg`} alt="" className="w-100" />
                        <h4 className="font-size-14 p-2 my-0 text-center text-dark">Example Banner {key}</h4>
                      </div>
                    </div>
                  ))
                }
              </div>
              <div className="col-6 pt-3">
                <div className="card oh radius-10 shadow position-sticky" style={{ top: '5.5rem' }}>
                  <div className="card-body p-0">
                    <Webcam onUserMedia={this.onUserMedia.bind(this)} audio={false} height='auto' ref={i => this.webcamRef = i} screenshotFormat="image/jpeg" width='100%' videoConstraints={{facingMode: "user"}} mirrored={true} />
                    <hr/>
                    <div className="row">
                      <div className="col-12 text-center">
                        Title Here
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-3 full-height pt-3 bg-white">
                <div className="border-bottom border-1 text-center mb-2">
                  <div className="btn btn-rounded btn-block btn-primary border-0 radius-0 mb-3">RENDERED</div>
                </div>
                <div className="same-200 mx-auto radius-10 border border-gray oh position-relative">
                  <div className="same-100 border border-1 border-danger radius-10 position-absolute bg-primary" style={{ top: '25%', left: '25%', opacity: 0.25 }} />
                  <img src={this.state.images} alt="" className="h-100"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default KiosK;
