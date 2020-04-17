import React from 'react'
import axios from 'axios'
import moment from 'moment'
import con from "../../con/api"
import "../app.scss"
import Logo from "../../assets/images/logo-letter.png"

class KiosK extends React.Component {
  state = {
    absen:[],
    loading:true
  }
  componentDidMount() {
    // document.body.style.color = 'red';
    document.body.classList.add('bg-danger');
    document.querySelector('.navbar').parentNode.removeChild(document.querySelector('.navbar'));
    // this.img.src = 'http://192.168.92.252/backend/public/img/capture1.jpg?'+Date.now();
    this.fetchImage = setInterval( () => this.img.src = con.img+'/capture1.jpg?'+Date.now(), 75 );
    // axios.get('http://192.168.92.252/backend/api/image_data').then(res => this.setState({ images:`data:image/jpeg;base64,${res.data}` }));
    this.fetchData = setInterval(() => {
      axios.get(con.api+'/user/absen', {headers:con.headers}).then(res => {
        this.setState({
          absen:res.data.absen,
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
      <div className="content-pages ou">
        <div className="content">
          <div className="container-fluid col-md-12">
            <div className="row pt-3">
              <div className="col-6">
                <div className="p-3 bg-white text-center">
                  <img src={Logo} alt="" className="w-50" />
                </div>
                <div className="card">
                  <div className="card-body p-0">
                    <div className="mx-auto oh">
                      <img src="" ref={i => this.img = i} alt="" className="h-100"/>
                    </div>
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
