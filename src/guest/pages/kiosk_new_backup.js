import React, {Fragment} from 'react'
import axios from 'axios'
import moment from 'moment'
import con from "../../con/api"
// INIT JS
import feather from 'feather-icons';

const Ads = () => (
  <Fragment>
    <div className="card shadow-sm">
      <div className="card-body p-0">
        <img src={`${con.img}/banner/p1.jpeg`} alt="" className="w-100"/>
      </div>
    </div>
    <div className="card shadow-sm">
      <div className="card-body p-0">
        <img src={`${con.img}/banner/1.jpg`} alt="" className="w-100"/>
      </div>
    </div>
    <div className="card shadow-sm">
      <div className="card-body p-0">
        <img src={`${con.img}/banner/4.jpg`} alt="" className="w-100"/>
      </div>
    </div>
  </Fragment>
)
const UserCard = () => (
  <div className="row">
    <div className="col-auto mx-auto">
      <div className="card mb-2 shadow-sm">
        <div className="card-body p-0">
          <div className="media py-2 px-3">
            <div className="media-body lh-1 text-7 text-nowrap">
              <div className="text-secondary text-uppercase f-700 border-bottom border-gray pb-1">- Total Karyawan</div>
              <div className="d-flex align-items-center mt-2">
                <h4 className="my-0 text-primary">92</h4>
                <div className="icon-dual-primary ml-auto bg-soft-primary p-1 radius-20" data-feather="users"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="col-auto mx-auto">
      <div className="card mb-2 shadow-sm">
        <div className="card-body p-0">
          <div className="media py-2 px-3">
            <div className="media-body lh-1 text-7 text-nowrap">
              <div className="text-secondary text-uppercase f-700 border-bottom border-gray pb-1">- Karyawan Aktif</div>
              <div className="d-flex align-items-center mt-2">
                <h4 className="my-0 text-success">80</h4>
                <div className="icon-dual-success ml-auto bg-soft-success p-1 radius-20" data-feather="user-check"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="col-auto mx-auto">
      <div className="card mb-2 shadow-sm">
        <div className="card-body p-0">
          <div className="media py-2 px-3">
            <div className="media-body lh-1 text-7 text-nowrap">
              <div className="text-secondary text-uppercase f-700 border-bottom border-gray pb-1">- Karyawan Cuti</div>
              <div className="d-flex align-items-center mt-2">
                <h4 className="my-0 text-warning">1</h4>
                <div className="icon-dual-warning ml-auto bg-soft-warning p-1 radius-20" data-feather="users"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="col-auto mx-auto">
      <div className="card mb-2 shadow-sm">
        <div className="card-body p-0">
          <div className="media py-2 px-3">
            <div className="media-body lh-1 text-7 text-nowrap">
              <div className="text-secondary text-uppercase f-700 border-bottom border-gray pb-1">- Karyawan Pulang</div>
              <div className="d-flex align-items-center mt-2">
                <h4 className="my-0 text-info">2</h4>
                <div className="icon-dual-info ml-auto bg-soft-info p-1 radius-20" data-feather="user-check"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)
const Device = (props) => (
  <div className={`row ${props.rowClass}`}>
    <div className="col-auto px-2">
      <div className="card shadow-sm pointer border-top border-primary mb-0">
        <div className="card-body px-2 py-1">
          <div className="row align-items-center">
            <div className="col-auto pr-0 pl-2">
              <div className="icon-dual-primary bg-light p-1 radius-10" data-feather="video"></div>
            </div>
            <div className="col pl-2">
              <h6 className="m-0 text-9"> Device 1 </h6>
            </div>
          </div>
        </div>
      </div>
    </div>
    {
      [2,3,4,5].map(key => (
        <div className="col-auto px-2" key={key}>
          <div className="card shadow-sm pointer border-top border-gray mb-0">
            <div className="card-body px-2 py-1">
              <div className="row align-items-center">
                <div className="col-auto pr-0 pl-2">
                  <div className="icon-dual bg-light p-1 radius-10" data-feather="video"></div>
                </div>
                <div className="col pl-2">
                  <h6 className="m-0 text-9 text-muted"> Device {key} </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))
    }
  </div>
)
class KiosK extends React.Component {
  state = {
    absen:[],
    belum:[],
    loading: true
  }
  componentDidMount() {
    feather.replace();
    // this.img.src = 'http://192.168.92.252/backend/public/img/capture1.jpg?'+Date.now();
    document.body.classList.add('bg-white');
    this.fetchImage = setInterval( () => this.img.src = con.img+'/capture1.jpg?'+Date.now(), 75 );
    // axios.get('http://192.168.92.252/backend/api/image_data').then(res => this.setState({ images:`data:image/jpeg;base64,${res.data}` }));
    this.fetchData = setInterval(() => {
      axios.get(con.api+'/user/absen', {headers:con.headers}).then(res => {
        this.setState({
          absen: res.data.absen,
          belum: res.data.belum,
          loading: false
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
          <div className="container-fluid col-md-12 px-5">
            <div className="row">
              {/* User Card */}
              <div className="col-2 pt-3"> <div className="position-sticky" style={{ top: '4rem' }}> <Ads /> </div> </div>
              <div className="col-2 full-height pt-3">
                <div className="border-bottom border-1 text-center mb-2">
                  <div className="alert bg-light mb-3 text-secondary f-700">Belum absen</div>
                </div>
                {
                  !this.state.loading && this.state.belum.map((r, key) => (
                    <div className="media mb-2 p-2 border-bottom border-1 radius-10 shadow" key={key}>
                      <div className="same-50 mx-auto radius-100 border border-gray d-flex align-items-center justify-content-center oh">
                        <img src={`${con.img}/user/thumb/${r.img}`} alt="" className="h-100"/>
                      </div>
                      <div className="media-body ml-2">
                        <h5 className="mt-0 mb-0 font-size-14"> {r.name} <p className="badge badge-pill px-2 badge-light d-table mt-1 mb-0">{r.username}</p> </h5>
                        <p className="mt-1 mb-0 text-muted text-truncate text-9"> Jabatan : <span className="text-primary f-600">{r.job}</span> </p>
                      </div>
                    </div>
                  ))
                }
              </div>
              <div className="col-6 pt-3">
                <div className="row position-sticky" style={{ top: '4rem' }}>
                  <div className="col-12">
                    <div className="card shadow oh mb-2">
                      <div className="card-body p-0">
                        <div className="mx-auto radius-10 border border-gray oh position-relative">
                          <div className="same-100 border border-1 border-danger radius-10 position-absolute bg-primary" style={{ top: '25%', left: '25%', opacity: 0.25 }} />
                          <img src="" ref={i => this.img = i} alt="" className="w-100"/>
                        </div>
                      </div>
                      <div className="position-absolute b-0 w-100 center p-3" style={{backgroundColor: 'rgba(255,255,255,0.75)'}}>
                        <Device />
                      </div>
                    </div>
                    <UserCard />
                  </div>
                </div>
              </div>
              <div className="col-2 full-height pt-3">
                <div className="border-bottom border-1 text-center mb-2">
                  <div className="alert bg-soft-success mb-3 text-success f-700">Sudah absen</div>
                </div>
                {
                  !this.state.loading && this.state.absen.slice(0,5).map((r, key) => (
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
