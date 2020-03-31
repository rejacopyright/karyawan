import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import con from '../../con/api';
import fire from '../../con/fire';
import Modal from '../../components/modal';
import Skeleton from 'react-skeleton-loader';
import Avatar from '../../assets/images/users/avatar.png';

class Dashboard extends Component {
  _isMounted = false;
  state = {
    users:[],
    users_page:1,
    users_search:'',
    users_self:{},
    loading:true
  }
  componentDidMount() {
    this._isMounted = true;
    document.title = 'List Karyawan';
    fire.on('value', () => {
      this._isMounted && axios.get(con.api+'/user', {headers:con.headers, params:{page:this.state.users_page}})
      .then(res => {
        this.setState({ users:res.data, loading:false });
      });
    });
  }
  userDetail(userId){
    const user = this.state.users.find(i => i.user_id === userId);
    this.setState({ users_self:user });
  }
  delete(){
    const q = {user_id:this.state.users_self.user_id}
    axios.post(con.api+'/user/delete', q, {headers:con.headers})
    .then(res => {
      this.setState({ users:res.data });
    });
  }
  render() {
    const ModalDelete = () => (
      <Fragment>
        <div className="text-center text-dark">
          Apakah anda yakin ingin menghapus <span className="text-danger strong text-capitalize">{`"${(this.state.users_self.name || '')}"`}</span> ?
        </div>
        <div className="modal-footer pb-0 px-0 mt-3">
          <button type="button" className="btn btn-rounded btn-white width-md" data-dismiss="modal">Close</button>
          <button type="button" className="btn btn-rounded btn-soft-danger" data-dismiss="modal" onClick={this.delete.bind(this)}>Save changes</button>
        </div>
      </Fragment>
    )
    return (
      <div className="content-page">
        <div className="content">
          <div className="container-fluid">
            <div className="row page-title">
              <div className="col-12">
                <h4 className="mb-1 mt-0">List Karyawan</h4>
              </div>
            </div>
            <div className="row">
              {
                Object.keys(this.state.users).length === 0 && [1,2,3,4].map((r, key) => (
                  <div key={key} className="col-md-3 col-6 text-center">
                    <div className="card radius-20">
                      <div className="card-body">
                        <Skeleton width="90px" height="90px" count={1} widthRandomness={0} color="#f5f5f5" borderRadius="100px" />
                        <div className="mb-3"></div>
                        <Skeleton width="100%" height="" count={2} widthRandomness={0} color="#f5f5f5" />
                        <Skeleton width="100%" height="100px" count={1} widthRandomness={0} color="#f5f5f5" />
                      </div>
                    </div>
                  </div>
                ))
              }
              {
                this.state.users.map((r, key) => (
                  <div className="col-md-3 col-6" key={key}>
                    <div className="card radius-20">
                      <div className="card-body px-2 py-0">
                        <div className="text-center mt-3">
                          {
                            r.img.length ?
                            <div className="same-100 mx-auto radius-100 border border-1 p-1 d-flex align-items-center justify-content-center oh">
                              <img src={`${con.img}/user/${r.img[0].name}`} alt="img" className="h-100" />
                            </div>
                            :
                            <img src={Avatar} alt="img" className="avatar-xl rounded-circle" />
                          }
                          <h5 className="mt-2 mb-0 text-capitalize"> {r.name} </h5>
                          <h6 className="text-muted font-weight-normal pb-2 border-bottom">{r.username} </h6>
                          <Link to={`/user/detail/${r.user_id}`} className="btn btn-soft-primary btn-sm same-25 p-0 oh radius-50 lh-2 mr-1"><i className="uil uil-eye text-primary" /></Link>
                          <Link to={`/user/edit/${r.user_id}`} className="btn btn-soft-warning btn-sm same-25 p-0 oh radius-50 lh-2 mr-1"><i className="uil uil-edit-alt text-warning" /></Link>
                          <Link to="#" className="btn btn-soft-danger btn-sm same-25 p-0 oh radius-50 lh-2" data-toggle="modal" data-target="#deleteModal" onClick={this.userDetail.bind(this, r.user_id)}><i className="uil uil-trash text-danger" /></Link>
                          <div className="mt-2 pt-1 border-top text-center">
                            <p className="text-muted mb-2 text-capitalize"> {r.alamat} </p>
                            <p className="mb-2"> <label className="badge badge-soft-success"> {r.tlp} </label> </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
            <Modal id="deleteModal" title="Hapus User" content={<ModalDelete />} />
          </div>
        </div>
      </div>
    );
  }
}
export default Dashboard;
