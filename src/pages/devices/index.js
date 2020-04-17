import React, {Fragment} from 'react'
import {Input} from '../../components/form'
import Modal from '../../components/modal'
import Notif from '../../components/notif'
import { ClassicSpinner } from "react-spinners-kit"
// import Webcam from "react-webcam"
// import Peer from "simple-peer"
// import socket from "socket.io"

class Setting extends React.Component {
  _isMounted = false;
  state = {
    loading: true,
    snackOpen: false,
    snackTheme: 'primary',
    snackMsg: '',
    base:''
  }
  capture(){
    this.setState({ base: this.webcam.getScreenshot() });
  }
  // callPeer(id){
  //   const peer = new Peer({
  //     initiator: true,
  //     trickle: false,
  //     stream: stream
  //   });
  //   peer.on('signal', data => {
  //
  //   });
  // }
  componentDidMount() {
    this._isMounted = true;
    this.setState({ loading:false });
    document.title = 'Display';
    this._isMounted && navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
      console.log(navigator);
    });
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  slideToggle(){
    document.body.classList.toggle('right-bar-enabled');
  }
  zoom(){
    console.log('zoom Modal');
  }
  render() {
    const ZoomModal = () => (
      <Fragment>
        <div className="vh-75 mx-auto oh" style={{ backgroundImage: `url('https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE2uCzt')`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="modal-footer pb-0 px-0 mt-3">
          <span className="badge badge-pill badge-soft-primary border border-primary f-800 m-0">CCTV 1</span>
          <div className="btn-group ml-auto">
            <button type="button" className="btn btn-light" data-dismiss="modal"><i className="uil uil-capture text-dark" /></button>
            <button type="button" className="btn btn-light"><i className="uil uil-sliders-v-alt text-warning" /></button>
            <button type="button" className="btn btn-light"><i className="uil uil-times-circle text-danger" /></button>
          </div>
        </div>
      </Fragment>
    )
    return (
      <div className="content-page">
        <div className="content">
          <div className="container-fluid">
            {/* <div className="d-nones">
              <Webcam
                audio={false}
                onTimeUpdate={this.capture.bind(this)}
                width='600'
                height='auto'
                ref={i => this.webcam = i}
                screenshotFormat="image/jpeg"
                videoConstraints={{facingMode: "user"}}
                mirrored={false}
                controls={false}
                screenshotQuality={.5} />
            </div> */}
            {/* <img src={this.state.base} width="100%" height="auto" alt=""/> */}
            {/* <div className="row">
              <div className="col-6">
                <video playsInline autoplay ref={i => this.me = i} muted />
              </div>
              <div className="col-6">
                <video playsInline autoplay ref={i => this.other = i} />
              </div>
            </div> */}
            <div className="row mt-3">
              <div className="col-md-2 d-none d-md-block">
                <form action="">
                  <div className="card shadow-sm">
                    <div className="btn-soft-primary p-1 text-center border-top border-primary f-600">Profile Instansi</div>
                    <div className="card-body px-2 pb-1">
                      <div className="row">
                        <div className="col-12 mb-2">
                          <Input name="name" title="Nama Instansi" placeholder="Nama Instansi" />
                        </div>
                      </div>
                    </div>
                    <div className="text-right p-2 border-top">
                      <button type="submit" className="btn btn-sm btn-rounded btn-soft-success"><i className="uil uil-check-circle mr-1" />Simpan Perubahan</button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="col-md-10">
                <div className="row">
                  <div className="col-md-4 mb-3">
                    <div className="card shadow-sm radius-10 oh">
                      <div className="card-body p-0">
                        <div className="hpx-200 mx-auto oh" style={{ backgroundImage: `url('https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE2uCzt')`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }} />
                        <div className="p-2 d-flex align-items-center">
                          <span className="badge badge-pill badge-soft-primary border border-primary f-800 m-0">CCTV 1</span>
                          <div className="btn-group ml-auto">
                            <button type="button" className="btn btn-sm btn-light" data-toggle="modal" data-target="#zoomModal" onClick={this.zoom.bind(this)}><i className="uil uil-capture text-dark" /></button>
                            <button type="button" className="btn btn-sm btn-light" onClick={this.slideToggle.bind(this)}><i className="uil uil-sliders-v-alt text-warning" /></button>
                            <button type="button" className="btn btn-sm btn-light"><i className="uil uil-times-circle text-danger" /></button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            { this.state.loading && <div className="overlay center"><ClassicSpinner color="#5369f8" loading={true} /></div> }
            <Notif open={this.state.snackOpen} onClose={() => this.setState({ snackOpen:false })} msg={this.state.snackMsg} theme={this.state.snackTheme} />
            <Modal id="zoomModal" title="CCTV 1" headerDisabled content={<ZoomModal />} modalClass="modal-xl" />
          </div>
        </div>
      </div>
    );
  }
}

export default Setting;
