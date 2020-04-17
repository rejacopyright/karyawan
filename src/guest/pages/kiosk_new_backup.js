import React from 'react'
import axios from 'axios'
import moment from 'moment'
import con from "../../con/api"

class KiosK extends React.Component {
  state = {
    absen:[],
    belum:[]
  }
  componentDidMount() {
    // this.img.src = 'http://192.168.92.252/backend/public/img/capture1.jpg?'+Date.now();
    this.fetchImage = setInterval( () => this.img.src = con.img+'/capture1.jpg?'+Date.now(), 75 );
    // axios.get('http://192.168.92.252/backend/api/image_data').then(res => this.setState({ images:`data:image/jpeg;base64,${res.data}` }));
    this.fetchData = setInterval(() => {
      axios.get(con.api+'/user/absen', {headers:con.headers}).then(res => {
        this.setState({
          absen:res.data.absen,
          belum:res.data.belum
        });
      });
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.fetchImage);
  }
  render () {
    return (
      <div className="content-page ou">
        <div className="content">
          <div className="container-fluid col-md-10 offset-md-1">
            <div className="row">
              <div className="col-3 full-height pt-3 bg-white">
                <div className="border-bottom border-1 text-center mb-2">
                  <div className="alert bg-soft-warning mb-3 text-warning f-700">Daftar karyawan yang belum absen hari ini</div>
                </div>
                {
                  this.state.belum.map((r, key) => (
                    <div className="media mb-2 p-1 pb-2 border-bottom border-1" key={key}>
                      <div className="same-50 mx-auto radius-100 border border-gray d-flex align-items-center justify-content-center oh">
                        <img src={`${con.img}/user/thumb/${r.img}`} alt="" className="h-100"/>
                      </div>
                      <div className="media-body ml-2">
                        <h5 className="mt-0 mb-0 font-size-14"> {r.name} <p className="badge badge-pill px-2 badge-soft-warning d-table mt-1 mb-0">{r.username}</p> </h5>
                        <p className="mt-1 mb-0 text-muted text-truncate text-9"> Jabatan : <span className="text-primary f-600">{r.job}</span> </p>
                      </div>
                    </div>
                  ))
                }
              </div>
              <div className="col-6 pt-3">
                <div className="card oh radius-10 shadow position-sticky" style={{ top: '4rem' }}>
                  <div className="card-body p-0">
                    <div className="mx-auto radius-10 border border-gray oh position-relative">
                      <div className="same-100 border border-1 border-danger radius-10 position-absolute bg-primary" style={{ top: '25%', left: '25%', opacity: 0.25 }} />
                      <img src="" ref={i => this.img = i} alt="" className="w-100"/>
                    </div>
                    <hr className="my-2"/>
                    <div className="row">
                      <div className="col-12 text-center mb-2">
                        Title Here
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-3 full-height pt-3 bg-white">
                <div className="border-bottom border-1 text-center mb-2">
                  <div className="alert bg-soft-success mb-3 text-success f-700">Daftar karyawan yang sudah absen hari ini</div>
                </div>
                {
                  this.state.absen.length && this.state.absen.map((r, key) => (
                    <div className="media mb-2 p-1 pb-2 border-bottom border-1" key={key}>
                      <div className="same-50 mx-auto radius-100 border border-gray d-flex align-items-center justify-content-center oh">
                        <img src={`${con.img}/user/thumb/${r.img}`} alt="" className="h-100"/>
                      </div>
                      <div className="media-body ml-2 oh">
                        <h5 className="mt-0 mb-0 font-size-14"> <span className="float-right text-muted font-size-12">{moment(r.created_at).format('HH:mm')}</span> {r.user.name} <p className="badge badge-pill px-2 badge-soft-success d-table mt-1 mb-0">{r.user.username}</p> </h5>
                        <p className="mt-1 mb-0 text-muted text-truncate text-9"> Jabatan : <span className="text-primary f-600">{r.user.job}</span> </p>
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
