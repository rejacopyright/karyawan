import React from 'react'
import axios from 'axios'
import moment from 'moment'
import con from "../../con/api"
import "../app.scss"
import Logo from "../../assets/images/logo-letter.png"
import Select from '../../components/select'

class KiosK extends React.Component {
  state = {
    absen:[],
    loading:true,
    deviceAll:[],
    devicesDefault:null,
    selectedDevices:[]
  }
  componentDidMount() {
    // document.body.style.color = 'red';
    document.body.classList.add('bg-danger');
    document.querySelector('.navbar').parentNode.removeChild(document.querySelector('.navbar'));
    // this.img.src = 'http://192.168.92.252/backend/public/img/capture1.jpg?'+Date.now();
    // axios.get('http://192.168.92.252/backend/api/image_data').then(res => this.setState({ images:`data:image/jpeg;base64,${res.data}` }));
    axios.get(con.api+'/user/devices/list').then(res => {
      const deviceAll = res.data.all.map(i => {
        // const dev = {}; dev['value'] = i; dev['label'] = `Device ${i}`; return dev;
        return {value: i, label: `Device ${i}`};
      });
      const devicesDefault = res.data.default;
      this.setState({deviceAll, devicesDefault, selectedDevices: [devicesDefault]})
    }).then(() => {
      this.fetchImage = setInterval( () => {
        // Array.from(this.img.querySelectorAll('.camera-child')).map((r, i) => {
        //   // i.querySelector('img').src = `${con.img}/devices/capture_${this.state.selectedDevices || this.state.devicesDefault}.jpg?${Date.now()}`;
        //   console.log(i);
        // });
        // console.log(Array.from(this.img.querySelectorAll('.camera-child')));
        // this.img.src = `${con.img}/devices/capture_${this.state.selectedDevices || this.state.devicesDefault}.jpg?${Date.now()}`;
        this.state.selectedDevices.map((r, i) => {
          Array.from(this.img.querySelectorAll('.camera-child'))[i].querySelector('img').src = `${con.img}/devices/capture_${r}.jpg?${Date.now()}`;
          return true;
        });
        // this.state.selectedDevices.length === 0 ?
        // this.images = () => (
        //   <div className="col">
        //     <img src={`${con.img}/devices/capture_${this.state.devicesDefault}.jpg?${Date.now()}`} alt="" className="w-100 h-100"/>
        //   </div>
        // )
        // :
        // this.images = () => (
        //   this.state.selectedDevices.map((r, key) => (
        //     <div className="col-md-6" key={key}>
        //       {console.log(key)}
        //       <img src={`${con.img}/devices/capture_${this.state.devicesDefault}.jpg?${Date.now()}`} alt="" className="w-100 h-100"/>
        //     </div>
        //   ))
        // )
      }
      , 75 );
    });
    this.fetchData = setInterval(() => {
      axios.get(con.api+'/user/absen', {headers:con.headers, params:{device_id:this.state.selectedDevices}}).then(res => {
        // console.log(res.config.params);
        this.setState({
          absen:res.data.absen,
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
    e ? this.setState({selectedDevices: e.map(i => i.value)}) : this.setState({selectedDevices: []});
  }
  render () {
    return (
      <div className="content-pages ou">
        <div className="content">
          <div className="container-fluid col-md-12">
            {/* <div className="position-fixed b-0 r-0 p-3">
              <div className="btn btn-rounded btn-success pointer">
                <i className="uil uil-plus"></i>
              </div>
            </div> */}
            <div className="row pt-3">
              <div className="col-6">
                <div className="p-3 bg-white text-center">
                  <img src={Logo} alt="" className="w-50" />
                </div>
                <div className="card">
                  <div className="card-body p-0">
                    {
                      this.state.deviceAll.length !== 0 &&
                      <Select
                        data={ this.state.deviceAll }
                        onChange={this.onChangeDevices.bind(this)}
                        multiple
                        defaultValue={this.state.devicesDefault || this.state.devicesDefault.toString() || 0}
                      />
                    }
                    <div className="mx-auto oh">
                      <div className="row align-items-center" ref={i => this.img = i} style={{marginTop:'-.25rem'}}>
                        {/* {console.log(this.state.selectedDevices)} */}
                        {
                          this.state.selectedDevices.length !== 0 &&
                          this.state.selectedDevices.map(key => (
                            <div className="camera-child col px-1 mt-1" key={key} style={{minWidth:'50%'}}><img src="" alt="" className="w-100"/></div>
                          ))
                        }
                      </div>
                      {/* <img src="" ref={i => this.img = i} alt="" className="w-100"/> */}
                    </div>
                    {/* <div className="row">
                      {(this.state.selectedDevices && this.images) && <this.images />}
                    </div> */}
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="p-3 text-center"> <h2 className="text-white">Attendance List</h2> </div>
                <div className="row align-items-center">
                  {
                    !this.state.loading && this.state.absen.slice(0,6).map((r, key) => (
                      <div className="col-md-4" key={key}>
                        <div className="center mb-2">
                          <div className="same-125 mx-auto radius-100 oh bg-img" style={{ backgroundImage: `url('${con.img}/user/thumb/${r.img}')` }}> </div>
                        </div>
                        <div className="card radius-0">
                          <div className="card-body radius-0 py-2 text-center">
                            <div className="d-block text-18 text-truncate"> {r.user.name} </div>
                            <div className="d-block text-9"> {moment(r.created_at).format('HH:mm')} </div>
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
