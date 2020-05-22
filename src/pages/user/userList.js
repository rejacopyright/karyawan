import React, {Component, Fragment} from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'
import con from '../../con/api'
import fire from '../../con/fire'
import Modal from '../../components/modal'
import Skeleton from 'react-skeleton-loader'
import Avatar from '../../assets/images/users/avatar.png'
import Select from '../../components/select'

const Loading = () => (
  <div className="row align-items-center mb-0 mt-3">
    <div className="col-auto pr-0">
      <Skeleton width="35px" height="35px" count={1} widthRandomness={0} color="#eee" borderRadius="100px" />
    </div>
    <div className="col">
      <Skeleton width="100%" height="10px" count={2} widthRandomness={0} color="#eee" />
    </div>
  </div>
);

function NoData(){
  return(
    <div className="row">
      <div className="col-12 text-center mt-4">
        <img src={require('../../assets/images/not-found.png')} alt="" width="250" style={{ filter: 'opacity(.25)' }} />
        <div className="d-block text-muted"><i className="uil uil-exclamation-circle mr-2" />Tidak ada data yang ditemukan... !</div>
      </div>
    </div>
  )
}

class Dashboard extends Component {
  _isMounted = false;
  state = {
    users:[],
    users_page:1,
    users_search:'',
    users_self:{},
    q:{},
    loading:true
  }
  fire(){
    axios.get(con.api+'/user', {headers:con.headers, params:{page:this.state.users_page, noBase:true, jabatan_id: this.state.q.jabatan_id, q: this.props.search}}).then(res => {
      this.setState({ users:res.data.user, loading:false });
    });
  }
  componentDidMount() {
    this._isMounted = true;
    document.title = 'List Karyawan';
    this._isMounted && this.fire();
    fire.on('value', () => this.fire());
  }
  componentDidUpdate(prev){
    if (this.props.search !== prev.search) {
      this.fire();
      // this.setState({ q: {...this.state.q, search: this.props.search} }, this.fire);
    }
  }
  userDetail(userId){
    const user = this.state.users.find(i => i.user_id === userId);
    this.setState({ users_self:user });
  }
  delete(){
    const q = {user_id:this.state.users_self.user_id}
    axios.post(con.api+'/user/delete', q, {headers:con.headers}).then(res => {
      this.setState({ users:res.data.user });
    });
  }
  onSelectJabatanChange(e){
    this.setState({ q: {...this.state.q, jabatan_id: e ? e.value : ''} }, this.fire);
  }
  pushUri = uri => this.props.history.push(`/user/detail/${uri}`);
  render() {
    const ModalDelete = () => (
      <Fragment>
        <div className="text-center text-dark">
          Apakah anda yakin ingin menghapus <span className="text-danger strong text-capitalize">{`"${(this.state.users_self.name || '')}"`}</span> ?
        </div>
        <div className="modal-footer pb-0 px-0 mt-3">
          <button type="button" className="btn btn-sm text-gray mr-2" data-dismiss="modal">Close</button>
          <button type="button" className="btn btn-sm btn-rounded btn-soft-danger" data-dismiss="modal" onClick={this.delete.bind(this)}>Save changes</button>
        </div>
      </Fragment>
    )
    return (
      <div className="content-page">
        <div className="content">
          <div className="container-fluid">
              <div className="row mt-3">
                <div className="col-md-3">
                  <Select title="Filter berdasarkan Jabatan" url={`${con.api}/jabatan`} param="jabatan" value="jabatan_id" label="name" onChange={this.onSelectJabatanChange.bind(this)} isClearable />
                  {
                    this.props.search &&
                    <div className="row mt-2">
                      <div className="col-12">
                        <small>Keyword :</small>
                        <h6 className="text-capitalize mt-0"> {this.props.search} </h6>
                      </div>
                    </div>
                  }
                </div>
                <div className="col-md-9">
                  <div className="table-responsives">
                    <table className={`table table-sm table-borderless ${Object.values(this.state.users).length !== 0 && 'table-hover'}`}>
                      <thead>
                        {
                          this.state.loading ?
                          <tr>
                            <th>
                              <Skeleton width="100%" height="40px" count={1} widthRandomness={0} color="#f5f5f5" />
                            </th>
                          </tr>
                          :
                          <tr>
                            <th className="mb-3 border-bottom border-2 text-center"><i className="uil uil-user" /></th>
                            <th className="mb-3 border-bottom border-2 text-12 f-400">Nama</th>
                            <th className="mb-3 border-bottom border-2 text-12 f-400">Jabatan</th>
                            <th className="mb-3 border-bottom border-2 text-12 f-400">Contact</th>
                            <th className="mb-3 border-bottom border-2 text-12 f-400">Alamat</th>
                            <th className="mb-3 border-bottom border-2 text-right"></th>
                          </tr>
                        }
                      </thead>
                      <tbody>
                        {
                          this.state.loading && [1,2,3,4,5].map(key => (
                            <tr key={key}>
                              <td><Loading /></td>
                            </tr>
                          ))
                        }
                        {
                          Object.values(this.state.users).length === 0 && !this.state.loading ?
                          <tr>
                            <td className="text-center" colSpan={6}><NoData /></td>
                          </tr>
                          :
                          this.state.users.map((r, key) => (
                            <tr key={key}>
                              <td onClick={this.pushUri.bind(this, r.user_id)} className="text-center pointer" width="60">
                                {
                                  r.img.length ?
                                  <div className="same-30 mx-auto radius-100 oh bg-img" style={{ backgroundImage: `url('${con.img}/user/thumb/${r.img[0].name}')` }}> </div>
                                  :
                                  <img src={Avatar} alt="img" className="avatar-xs rounded-circle" />
                                }
                              </td>
                              <td onClick={this.pushUri.bind(this, r.user_id)} className="pointer">
                                <h6 className="text-capitalize m-0"> {r.name} </h6>
                                <h6 className="text-muted text-8 m-0">{r.username} </h6>
                              </td>
                              <td onClick={this.pushUri.bind(this, r.user_id)} className="pointer text-dark text-capitalize text-9 text-truncate">{r.jabatan ? r.jabatan.name : '-'}</td>
                              <td onClick={this.pushUri.bind(this, r.user_id)} className="pointer text-dark text-9">{r.tlp}</td>
                              <td onClick={this.pushUri.bind(this, r.user_id)} className="pointer text-dark text-capitalize text-9 text-truncate">{r.alamat}</td>
                              <td className="text-right">
                                <div className="btn-group dropleft py-2">
                                  <button className="btn text-dark dropdown-toggle py-0 pl-1" data-toggle="dropdown" aria-expanded="false"><i className="uil uil-ellipsis-h"></i></button>
                                  <div className="dropdown-menu">
                                    {/* <span className="dropdown-header">Move to</span> */}
                                    {/* <Link to={`/user/detail/${r.user_id}`} className="dropdown-item text-9"><i className="uil uil-eye mr-2" />View</Link> */}
                                    <Link to={`/user/edit/${r.user_id}`} className="dropdown-item text-9"><i className="uil uil-edit-alt mr-2" />Edit</Link>
                                    <Link to="#" className="dropdown-item text-9" data-toggle="modal" data-target="#deleteModal" onClick={this.userDetail.bind(this, r.user_id)}><i className="uil uil-trash mr-2" />Delete</Link>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          ))
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            <div className="position-fixed b-0 r-0 p-3">
              <Link to="/user/add" className="btn btn-primary same-50 radius-50 center"><i className="uil uil-plus text-14" /></Link>
            </div>
            <Modal id="deleteModal" content={<ModalDelete />} />
          </div>
        </div>
      </div>
    );
  }
}
export default connect(s => s)(Dashboard);
