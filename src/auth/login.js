import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios';
import con from '../con/api';
import { ClassicSpinner } from "react-spinners-kit";
// INIT JS
import feather from 'feather-icons';
class Login extends Component {
  state = {
    loading: false
  }
  componentDidMount() {
    require('../assets/js/app');
    feather.replace();
  }
  componentWillUnmount() {
    delete require.cache[require.resolve('../assets/js/app')];
  }
  submit(e){
    e.preventDefault();
    this.setState({ loading:true });
    const q = {};
    q['username'] = this.props.username;
    q['password'] = this.props.password;
    axios.post(con.api + '/admin/login',q).then(res => {
      if (res.data.id) {
        this.props.handleLogin(res.data);
      }else {
        this.props.handleMessage(res.data.message);
        this.setState({ loading:false });
      }
    }).catch(err => {
      this.props.handleMessage('Terjadi kesalahan atau koneksi bermasalah.');
      this.setState({ loading:false });
    });
  }
  render() {
    return (
      <div className="account-pages">
        <div className="container">
          <div className="row justify-content-center align-items-center vh-100">
            <div className="col-xl-10">
              <div className="card shadow-lg radius-30">
                <div className="card-body p-0">
                  <div className="row">
                    <div className="col px-5 py-4 border-right border-1">
                      <div className="mx-auto mb-4">
                        <span>
                          <img src={require("../assets/images/logo.png")} className="mr-2" alt="" height={25} />
                          <h3 className="d-inline align-middle ml-1 text-logo">Sugihart</h3>
                        </span>
                      </div>
                      <h5 className="mb-0"> Login </h5>
                      <div className="badge badge-soft-danger h5 px-2">{this.props.message}</div>
                      <p className="text-muted mt-1 mb-3"> Masukan Username dan Password anda. </p>
                      <form action="#" className="authentication-form" onSubmit={this.submit.bind(this)}>
                        <div className="form-group">
                          <div className="input-group input-group-merge">
                            <div className="input-group-prepend"> <span className="input-group-text bg-light border-0"> <i className="icon-dual text-gray" data-feather="user" /> </span> </div>
                            <input type="text" name="username" className="form-control bg-light border-0" placeholder="Username" onChange={i => this.props.handleUsername(i)} autoFocus={true} />
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="input-group input-group-merge">
                            <div className="input-group-prepend"> <span className="input-group-text bg-light border-0"> <i className="icon-dual text-gray" data-feather="key" /> </span> </div>
                            <input type="text" name="password" className="form-control bg-light border-0" placeholder="Password" onChange={i => this.props.handlePassword(i)} />
                          </div>
                        </div>
                        <div className="form-group mb-0 text-center">
                          {
                            this.state.loading ?
                              <button className="btn btn-light btn-block" type="button" disabled> Menunggu verifikasi.. </button>
                            :
                            <button className="btn btn-primary btn-block" type="submit"> Login </button>
                          }
                        </div>
                      </form>
                    </div>
                    <div className="col-md-6 d-none d-md-flex oh align-items-center justify-content-center">
                      <img src={require('../assets/images/maintenance.svg')} alt="" style={{height:'250px'}}/>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-12 text-center">
                  <p className="text-muted"> Don't have account ? Let <span className="text-primary font-weight-bold ml-1">Register</span> </p>
                </div>
              </div>
            </div>
          </div>
          { this.state.loading && <div className="overlay center"><ClassicSpinner color="#5369f8" loading={true} /></div> }
        </div>
      </div>
    );
  }
}
const mapState = (state) => {
  return {
    username:state.username,
    password:state.password,
    auth:state.auth,
    message:state.message,
  }
}
const mapDispatch = (dispatch) => {
  return {
    handleUsername: (e) => dispatch({type:'USERNAME', value:e.target.value}),
    handlePassword: (e) => dispatch({type:'PASSWORD', value:e.target.value}),
    handleLogin: (e) => dispatch({type:'LOGIN', value:e}),
    handleMessage: (e) => dispatch({type:'MESSAGE', value:e})
  }
}
export default connect(mapState, mapDispatch)(Login)
