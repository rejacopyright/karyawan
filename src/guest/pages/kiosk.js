import React from 'react'
import axios from 'axios'
import moment from 'moment'
import con from "../../con/api"

class KiosK extends React.Component {
  state = {
    absen:[]
  }
  componentDidMount() {
    document.body.classList.add('bg-danger');
    // this.img.src = 'http://192.168.92.252/backend/public/img/capture1.jpg?'+Date.now();
    this.fetchImage = setInterval( () => this.img.src = con.img+'/capture1.jpg?'+Date.now(), 75 );
    // axios.get('http://192.168.92.252/backend/api/image_data').then(res => this.setState({ images:`data:image/jpeg;base64,${res.data}` }));
    this.fetchData = setInterval(() => {
      axios.get(con.api+'/user/absen', {headers:con.headers}).then(res => {
        this.setState({
          absen:res.data.absen
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
          <div className="container-fluid col-md-12">
            <div className="row pt-3">
              <div className="col-5">
                <div className="card">
                  <div className="card-body p-0">
                    <div className="mx-auto oh">
                      <img src="" ref={i => this.img = i} alt="" className="w-100"/>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-7">
                <div className="row">
                  {
                    this.state.absen.length && this.state.absen.slice(0,6).map((r, key) => (
                      <div className="col-md-4 px-4 hpx-150" key={key} style={{ marginTop: '110px' }}>
                        <div className="card radius-0">
                          <div className="position-absolute w-100 center" style={{ top: '-100%' }}>
                            <div className="same-150 mx-auto radius-100 oh bg-img" style={{ backgroundImage: `url('${con.img}/user/thumb/${r.img}')` }}> </div>
                          </div>
                          <div className="card-body radius-0 text-center" style={{ paddingTop: '40px' }}>
                            <div className="d-block text-22"> {r.user.name} </div>
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
