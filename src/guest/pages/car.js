import React from 'react'
// import axios from 'axios'
import moment from 'moment'
import con from "../../con/api"
// INIT JS
import feather from 'feather-icons';
import cars from './car.json';
import Avatar from '../../assets/images/users/avatar.png'

const UserCard = () => (
  <div className="row">
    <div className="col">
      <div className="card mb-2 shadow-sm">
        <div className="card-body p-0">
          <div className="media py-2 px-3">
            <div className="media-body lh-1 text-7 text-nowrap">
              <div className="text-secondary text-uppercase f-700 border-bottom border-gray pb-1">- Available Cars</div>
              <div className="d-flex align-items-center mt-2">
                <h4 className="my-0 text-primary">92</h4>
                <div className="icon-dual-primary ml-auto bg-soft-primary p-1 radius-20" data-feather="users"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="col">
      <div className="card mb-2 shadow-sm">
        <div className="card-body p-0">
          <div className="media py-2 px-3">
            <div className="media-body lh-1 text-7 text-nowrap">
              <div className="text-secondary text-uppercase f-700 border-bottom border-gray pb-1">- Rented Cars</div>
              <div className="d-flex align-items-center mt-2">
                <h4 className="my-0 text-danger">18</h4>
                <div className="icon-dual-danger ml-auto bg-soft-danger p-1 radius-20" data-feather="user-check"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="col">
      <div className="card mb-2 shadow-sm">
        <div className="card-body p-0">
          <div className="media py-2 px-3">
            <div className="media-body lh-1 text-7 text-nowrap">
              <div className="text-secondary text-uppercase f-700 border-bottom border-gray pb-1">- Arrived</div>
              <div className="d-flex align-items-center mt-2">
                <h4 className="my-0 text-success">5</h4>
                <div className="icon-dual-success ml-auto bg-soft-success p-1 radius-20" data-feather="users"></div>
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
      [2,3,4].map(key => (
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
class CarRental extends React.Component {
  state = {
    rented:[],
    cars:[],
    loading: true
  }
  componentDidMount() {
    feather.replace();
    document.body.classList.add('bg-white');
    console.log(cars);
    this.setState({cars, rented:cars, loading:false});
  }
  render () {
    return (
      <div className="content-page ou">
        <div className="content">
          <div className="container-fluid col-md-12 px-3">
            <div className="row">
              {/* User Card */}
              <div className="col-6 pt-3">
                <div className="row position-sticky" style={{ top: '4rem' }}>
                  <div className="col-12">
                    <div className="card shadow oh mb-2">
                      <div className="card-body p-0">
                        <div className="mx-auto radius-10 border border-gray oh position-relative">
                          <div className="same-100 border border-1 border-danger radius-10 position-absolute bg-primary" style={{ top: '25%', left: '25%', opacity: 0.25 }} />
                          <img src={con.img+'/car/car_1.png?'} alt="" className="w-100"/>
                        </div>
                      </div>
                      <div className="position-absolute b-0 w-100 center p-3" style={{backgroundColor: 'rgba(255,255,255,0.5)'}}>
                        <Device />
                      </div>
                    </div>
                    <UserCard />
                  </div>
                </div>
              </div>
              {/* Available Cars */}
              <div className="col-2 full-height pt-3">
                <div className="border-bottom border-1 text-center mb-2">
                  <div className="badge badge-soft-primary d-block text-10 py-2 mb-2 f-700">Available Car</div>
                </div>
                {
                  !this.state.loading && this.state.cars.slice(0,5).map((r, key) => (
                    <div className="media center mb-2 p-2 border-bottom border-1 radius-5 shadow" key={key}>
                      <div className="radius-100 center oh">
                        <img src={con.img+'/car/car-xs.png'} alt="img" className="avatar-xs rounded-circle" />
                      </div>
                      <div className="media-body ml-2">
                        <h6 className="m-0 text-9"> {r.name}</h6>
                        <p className="m-0 text-muted text-truncate text-9"> <span className="badge badge-soft-primary f-600">{r.plat}</span> </p>
                      </div>
                    </div>
                  ))
                }
              </div>
              <div className="col full-height pt-3">
                <div className="border-bottom border-1 text-center mb-2">
                  <div className="badge badge-soft-success d-block text-10 py-2 mb-2 f-700">Rented Cars</div>
                </div>
                {
                  !this.state.loading && this.state.rented.slice(0,5).map((r, key) => (
                    <div className="media mb-2 p-1 pb-2 border-bottom border-1" key={key}>
                      <div className="radius-100 center oh">
                        <img src={Avatar} alt="img" className="avatar-xs rounded-circle" />
                      </div>
                      <div className="media-body ml-2 oh">
                        <h5 className="mt-0 mb-0 text-9">
                          <span className="float-right text-muted text-8"><i className="uil uil-clock text-7 mr-1" />{moment(r.created_at).format('HH:mm')}</span>
                          Driver Name
                          {/* {r.name} */}
                        </h5>
                        <div className="text-9">
                          <p className="m-0 f-600 text-8 text-primary">{r.name}</p>
                          <span className="badge px-2 badge-soft-success mt-1 mb-0">{r.plat}</span>
                          <div className="m-0 text-muted text-truncate text-9 float-right"><span className="badge badge-soft-danger f-600">Rented</span> </div>
                        </div>
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

export default CarRental;
