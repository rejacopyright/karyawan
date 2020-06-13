import React from 'react'
import axios from 'axios'
import moment from 'moment'
import con from "../../con/api"
// INIT JS
import Particles from 'react-particles-js'
// import particleJson from '../../components/particle'
import Select from '../../components/select'
// import Avatar from '../../assets/images/users/avatar.png'
import Logo from "../../assets/images/logo.png"

const UserCard = (props) => (
  <div className="col-4 px-1">
    <div className="card shadow-lg radius-10 mb-0" style={{backgroundColor: 'rgba(0,0,0,.2)'}}>
      <div className="card-body p-0">
        <div className="media py-2 px-3">
          <div className="media-body lh-1 text-7 text-nowrap">
            <div className="text-white text-uppercase f-700 border-bottom border-gray pb-1">- {props.title || 'Title'}</div>
            <div className="d-flex align-items-center mt-2">
              <h4 className={`my-0 text-${props.theme}`}>{props.nominal || 0}</h4>
              <div className={`icon-dual-${props.theme} ml-auto bg-soft-${props.theme} p-1 radius-20`} data-feather="users"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)
class KiosK extends React.Component {
  _isMounted = false;
  state = {
    hadir:[],
    absen:[],
    resume:{
      tot_user:0,
      tot_hadir:0,
      tot_absen:0,
    },
    loading:true,
    deviceAll:[],
    devicesDefault:null,
    selectedDevices:[],
    speed: 100
  }
  componentDidMount() {
    this._isMounted = true;
    this._isMounted && import('feather-icons').then(f => f.replace());
    // document.body.classList.add('bg-danger');
    document.querySelector('.navbar').parentNode.removeChild(document.querySelector('.navbar'));
    this._isMounted && axios.get(con.api+'/user/devices/list').then(res => {
      const deviceAll = res.data.all.map(i => {
        return {value: i, label: `Device ${i}`};
      });
      const devicesDefault = res.data.default;
      this.setState({deviceAll, devicesDefault, selectedDevices: [devicesDefault]})
    }).then(() => {
      this.fetchImage = setInterval( () => {
        this.state.selectedDevices.map((r, i) => {
          Array.from(this.img.querySelectorAll('.camera-child'))[i].querySelector('img').src = `${con.img}/devices/capture_${r}.jpg?${Date.now()}`;
          return true;
        });
      }
      , this.state.speed || 100 );
    });
    this.fetchData = setInterval(() => {
      axios.get(con.api+'/user/absen', {headers:con.headers, params:{device_id:this.state.selectedDevices}}).then(res => {
        this.setState({
          hadir:res.data.hadir,
          absen:res.data.absen,
          resume:res.data.resume,
          loading: false
        });
      });
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.fetchImage);
    clearInterval(this.fetchData);
  }
  onChangeDevices(e){
    if (e) {
      console.log(e.map(i => i.value));
      // console.log(e.map(i => i.value).sort((a,b) => a-b));
    }
    const length = e ? e.length : 0;
    const speed = 75 + (length * 25);
    e ?
    this.setState({selectedDevices : []}, () => {
      this.setState({selectedDevices: e.map(i => i.value), speed: speed });
    })
    : this.setState({selectedDevices: []});
  }
  refresh(){
    this.setState({deviceAll: [], devicesDefault:null, selectedDevices:[]});
    axios.get(con.api+'/user/devices/list').then(res => {
      const deviceAll = res.data.all.map(i => {
        // const dev = {}; dev['value'] = i; dev['label'] = `Device ${i}`; return dev;
        return {value: i, label: `Device ${i}`};
      });
      const devicesDefault = res.data.default;
      this.setState({deviceAll, devicesDefault, selectedDevices: [devicesDefault]})
    });
  }
  render () {
    return (
      <div className="content-pages ou">
        <Particles canvasClassName="bg-anim position-fixed vh-100 w-100" params={{
          "particles": {
            "number": {
              "value": 50,
              "density":{
                "enable": true,
                "value_area":1000
              }
            },
            "size": {
              "value": 3
            }
          },
          "interactivity": {
            "events": {
              "onhover": {
                "enable": true,
                "mode": "repulse"
              }
            }
          }
        }} />
        <div className="content">
          <div className="container-fluid col-md-12 px-3">
            <div className="row">
              {/* User Card */}
              <div className={`col-md-5 col-12 pt-3`}>
                <div className="row position-sticky" style={{ top: '0rem' }}>
                  <div className="col-12">
                    <div className="p-2 center-left radius-50 mb-2" style={{backgroundColor: 'rgba(255,255,255,.15)'}}>
                      <img src={Logo} alt="" height={35} className="pl-2" />
                      <div className="text-white pl-2">
                        <h5 className="m-0 lh-1 f-900 text-white">HUTAMAKARYA</h5>
                        <p className="m-0 lh-1 f-600">Realtindo</p>
                      </div>
                      <button type="button" className="btn btn-xs btn-soft-light radius-20 ml-auto" onClick={this.refresh.bind(this)}>Refresh Devices</button>
                    </div>
                    <div className="card shadow mb-2" style={{backgroundColor: 'unset'}}>
                      <div className="card-body p-0 radius-10 oh">
                        <div className="row align-items-center ml-0 o-7" ref={i => this.img = i} style={{marginTop:'-.25rem', marginRight: '-.25rem'}}>
                          {
                            this.state.selectedDevices.length !== 0 &&
                            this.state.selectedDevices.map(key => (
                              <div className="camera-child col pl-0 pr-1 mt-1" key={key} style={{minWidth:'50%'}}><img src="" alt="" className="w-100"/></div>
                            ))
                          }
                        </div>
                      </div>
                      {
                        this.state.deviceAll.length !== 0 &&
                        <Select
                          data={ this.state.deviceAll }
                          onChange={this.onChangeDevices.bind(this)}
                          multiple
                          defaultValue={this.state.devicesDefault || this.state.devicesDefault.toString() || 0}
                        />
                      }
                    </div>
                    <div className="row mx-0 d-none d-md-flex">
                      <UserCard title="Total" theme="warning" nominal={this.state.resume.tot_user} />
                      <UserCard title="Absen" theme="danger" nominal={this.state.resume.tot_absen} />
                      <UserCard title="Hadir" theme="success" nominal={this.state.resume.tot_hadir} />
                    </div>
                  </div>
                </div>
              </div>
              {/* Absen */}
              {
                Object.values(this.state.absen).length > 0 &&
                <div className={`col-md-2 col-4 full-height pt-3`}>
                  <div className="border-bottom border-1 text-center mb-2">
                    <div className="badge badge-soft-danger d-block text-10 py-2 mb-2 f-700">Absen</div>
                  </div>
                  {
                    !this.state.loading && this.state.absen.map((r, key) => (
                      <div className="media center mt-2 p-2 radius-5 shadow-lg" key={key} style={{backgroundColor: 'rgba(0,0,0,.15)'}}>
                        <div className="radius-100 center oh">
                          <div className="avatar-xs rounded-circle oh bg-img" style={{ backgroundImage: `url('${con.img}/user/thumb/${r.img}')` }}> </div>
                        </div>
                        <div className="media-body ml-2 text-truncate">
                          <h6 className="m-0 text-9 text-truncate text-white"> {r.name}</h6>
                          <p className="m-0 text-muted text-truncate text-9"> <span className="badge badge-soft-primary f-600">{r.plat}</span> </p>
                        </div>
                      </div>
                    ))
                  }
                </div>
              }
              {/* Hadir */}
              <div className={`${Object.values(this.state.absen).length > 0 ? 'col-md-5 col-8' : 'col-md-7 col-12'} full-height pt-3`}>
                <div className="border-bottom border-1 text-center">
                  <div className="badge badge-soft-success d-block text-10 py-2 mb-2 f-700">Karyawan Hadir</div>
                </div>
                <div className="row mx-0">
                  {
                    !this.state.loading && this.state.hadir.slice(0,5).map((r, key) => (
                      <div className="col-md-6 px-1 pt-2" key={key}>
                        <div className="center-left p-2 shadow-lg radius-10" style={{backgroundColor: 'rgba(0,0,0,.15)'}}>
                          <div className="center col-auto px-0">
                            <div className="same-40 mx-auto radius-100 oh bg-img" style={{ backgroundImage: `url('${con.img}/user/thumb/${r.img}')` }}> </div>
                          </div>
                          <div className="col text-truncate">
                            <p className="m-0 lh-1 text-10 f-600 text-white text-truncate">{r.user.name}</p>
                            <p className="m-0 lh-1 text-8 f-600 text-white text-truncate">{r.jabatan || '-'}</p>
                          </div>
                          <div className="col-auto text-right">
                            <div className="text-7 f-600 text-white"><i className="uil uil-clock text-6 mr-1" />{moment(r.created_at).format('HH:mm')}</div>
                            <div className="badge badge-soft-success text-7 mt-1 mb-0">Device {r.device_id}</div>
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
      </div>
    )
  }
}

export default KiosK;
