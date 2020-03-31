import React from 'react'
import Webcam from "react-webcam"
import con from "../../con/api"

class KiosK extends React.Component {
  state = {
    images:[]
  }
  webcamRef = React.createRef(null);
  capture(){
    this.setState({ images: [{keys: this.state.images.length + 1, base:this.webcamRef.current.getScreenshot()}, ...this.state.images] });
  }
  render () {
    console.log(con.img);
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
                    <Webcam audio={false} height='auto' ref={this.webcamRef} screenshotFormat="image/jpeg" width='100%' videoConstraints={{facingMode: "user"}} mirrored={true} />
                    <hr/>
                    <div className="row">
                      <div className="col-12 text-center">
                        <button className="btn btn-soft-primary" onClick={this.capture.bind(this)}>Capture photo</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-3 full-height pt-3 bg-white">
                <div className="border-bottom border-1 text-center mb-2">
                  <div className="btn btn-rounded btn-block btn-primary border-0 radius-0 mb-3">USER TERDAFTAR</div>
                </div>
                {
                  this.state.images.map((r, key) => (
                    <div className="media mb-2 p-1 pb-2 border-bottom border-1" key={key}>
                      <div className="same-50 mx-auto radius-100 border border-gray d-flex align-items-center justify-content-center oh">
                        <img src={r.base} alt="" className="h-100"/>
                      </div>
                      <div className="media-body ml-2">
                        <h5 className="mt-0 mb-0 font-size-14"> <span className="float-right text-muted font-size-12">4:30am</span> Nama {r.keys} <p className="badge badge-pill px-2 badge-soft-success d-table mt-1 mb-0">username_{r.keys}</p> </h5>
                        <p className="mt-1 mb-0 text-muted"> Lorem ipsum dolor sit amet, consectetur. </p>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default KiosK;
