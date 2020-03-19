import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import con from '../../con/api';
import fire from '../../con/fire';
// import Avatar from '../../assets/images/users/avatar-1.jpg';
import '../../assets/libs/smartwizard/smart_wizard_theme_arrows.min.scss';
class Dashboard extends React.Component {
  _isMounted = false;
  state = {
    user:[],
    images:[],
    imagesChanged:false,
    loading:true
  }
  componentDidMount() {
    this._isMounted = true;
    const userId = this.props.match.params.userId;
    this._isMounted && axios.get(con.api+'/user/detail/'+userId, {headers:con.headers})
    .then(res => {
      const images = res.data.images.map(i => {
        return {
          base : 'data:image/jpeg;base64,'+i.base
        }
      });
      this.setState({ user:res.data.user, images:images, loading:false });
    }).then(() => (document.title = this.state.user.name));
    require('../../assets/js/pages/form-wizard.init');
  }
  componentWillUnmount() {
    delete require.cache[require.resolve('../../assets/js/pages/form-wizard.init')];
  }
  browseImage(e){
    e.currentTarget.querySelector('input[type=file]').click();
  }
  changeImage(e){
    const files = e.currentTarget.files;
    if (files.length) {
      this.setState({ imagesChanged:true });
      for (let i of files) {
        const reader = new FileReader();
        reader.onload = () => {
          this.setState({ images: [...this.state.images, {base:reader.result}] });
        }
        reader.readAsDataURL(i);
      }
    }
  }
  removeImage(key){
    const images = [...this.state.images];
    images.splice(key, 1);
    this.setState({ images:images, imagesChanged:true });
  }
  submit(){
    const form = selector => this.editForm.querySelector(selector);
    const q = {user_id:this.state.user.user_id};
    q['name'] = form('input[name=name]').value;
    q['gender'] = form('input[name=gender]:checked').value;
    q['job'] = form('input[name=job]').value;
    q['nik'] = form('input[name=nik]').value;
    q['kk'] = form('input[name=kk]').value;
    q['tlp'] = form('input[name=tlp]').value;
    q['alamat'] = form('textarea[name=alamat]').value;
    q['email'] = form('input[name=email]').value;
    q['username'] = form('input[name=username]').value;
    q['password'] = form('input[name=password_confirm]').value;
    if (this.state.imagesChanged) { q['img'] = this.state.images.map(i => i.base); }
    this.setState({ imagesChanged:false });
    if (q.name && q.email && q.username) {
      axios.post(con.api+'/user/update', q, {headers:con.headers})
      .then(res => {
        fire.set(Date.now());
      });
    }
  }
  render() {
    return (
      <div className="content-page">
        <div className="content">
          <div className="container-fluid">
            <div className="row page-title">
              <div className="col-md-12">
                <Link to="/user/list"> <h4 className="mb-1 mt-0 text-capitalize"> <i className="uil uil-arrow-left" /> {this.state.user.name} </h4> </Link>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <form action="" className="form-horizontal" ref={i => this.editForm = i}>
                      <div id="smartwizard-arrows">
                        <ul>
                          <li> <a href="#profile-tab">Profile<small className="d-block"> Data diri </small></a> </li>
                          <li> <a href="#akun-tab">Akun<small className="d-block"> Informasi akun </small></a> </li>
                          <li> <a href="#pictures-tab">Pictures<small className="d-block"> Verifikasi wajah </small></a> </li>
                          <li> <a href="#finish-tab">Finish<small className="d-block"> Tanda tangan </small></a> </li>
                        </ul>
                        <div className="px-3">
                          <div id="profile-tab">
                            <div className="row">
                              <div className="col-md">
                                <div className="form-group">
                                  <label htmlFor="sw-arrows-userName"> Nama Lengkap </label>
                                  <input type="text" name="name" defaultValue={this.state.user.name} className="form-control" placeholder="Nama Lengkap" />
                                </div>
                              </div>
                              <div className="col-md text-center">
                                <div className="form-group">
                                  <label htmlFor="gender"> Jenis Kelamin </label>
                                  <div className="mt-2">
                                    <div className="custom-control custom-radio d-inline mr-2">
                                      { !this.state.loading && <input type="radio" id="mr" name="gender" value="1" className="custom-control-input" defaultChecked={this.state.user.gender === 1} /> }
                                      <label className="custom-control-label" htmlFor="mr">Mr.</label>
                                    </div>
                                    <div className="custom-control custom-radio d-inline">
                                      { !this.state.loading && <input type="radio" id="mrs" name="gender" value="0" className="custom-control-input" defaultChecked={this.state.user.gender === 0} /> }
                                      <label className="custom-control-label" htmlFor="mrs">Mrs.</label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md">
                                <div className="form-group">
                                  <label htmlFor="jabatan"> Jabatan </label>
                                  <input type="text" name="job" defaultValue={this.state.user.job} className="form-control" placeholder="Jabatan" />
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md">
                                <div className="form-group">
                                  <label htmlFor="nik"> Nomor Induk </label>
                                  <input type="text" name="nik" defaultValue={this.state.user.nik} className="form-control" placeholder="NIK" />
                                </div>
                              </div>
                              <div className="col-md">
                                <div className="form-group">
                                  <label htmlFor="kk"> Nomor Kartu Keluarga </label>
                                  <input type="text" name="kk" defaultValue={this.state.user.kk} className="form-control" placeholder="KK" />
                                </div>
                              </div>
                              <div className="col-md">
                                <div className="form-group">
                                  <label htmlFor="tlp"> Nomor Telp. </label>
                                  <input type="text" name="tlp" defaultValue={this.state.user.tlp} className="form-control" placeholder="Nomor Telp." />
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md">
                                <div className="form-group">
                                  <label htmlFor="alamat"> Alamat </label>
                                  <textarea type="text" name="alamat" defaultValue={this.state.user.alamat} className="form-control" placeholder="Isi Alamat Lengkap..." />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div id="akun-tab">
                            <div className="row">
                              <div className="col-md">
                                <div className="form-group">
                                  <label htmlFor="email"> Email </label>
                                  <input type="text" name="email" defaultValue={this.state.user.email} className="form-control" placeholder="Email" />
                                </div>
                              </div>
                              <div className="col-md">
                                <div className="form-group">
                                  <label htmlFor="username"> Username </label>
                                  <input type="text" name="username" defaultValue={this.state.user.username} className="form-control" placeholder="Username" />
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md">
                                <div className="form-group">
                                  <label htmlFor="password"> Ubah Password </label>
                                  <input type="text" name="password" className="form-control" placeholder="Password" />
                                </div>
                              </div>
                              <div className="col-md">
                                <div className="form-group">
                                  <label htmlFor="password_confirm"> Konfirmasi Password </label>
                                  <input type="text" name="password_confirm" className="form-control" placeholder="Konfirmasi Password" />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div id="pictures-tab">
                            <div className="row">
                              <div className="col-md-auto text-center mb-3">
                                <div className="same-200 pointer mx-auto oh p-2 d-flex align-items-center justify-content-center border border-gray border-1 border-dashed radius-20" onClick={this.browseImage.bind(this)}>
                                  <input type="file" accept="image/png, image/jpeg" className="d-none" multiple={true} onChange={this.changeImage.bind(this)} />
                                  <h5 className="m-0 text-muted">Add image</h5>
                                </div>
                              </div>
                              {
                                this.state.images.map((r, key) => (
                                  <div className="col-md-auto text-center mb-3" key={key}>
                                    <div className="same-200 mx-auto oh p-2 position-relative d-flex align-items-center justify-content-center border border-gray border-1 border-dashed radius-20">
                                      <div className="position-absolute r-0 t-0" onClick={this.removeImage.bind(this, key)}><i className="uil uil-times-circle text-danger h2" /></div>
                                      <img className="w-100 img-avatar radius-5" src={r.base} alt="" />
                                    </div>
                                  </div>
                                ))
                              }
                            </div>
                          </div>
                          <div id="finish-tab">
                            <div className="row">
                              <div className="col-12">
                                <div className="text-center">
                                  <div className="mb-3"> <i className="uil uil-check-circle text-success h2" /> </div>
                                  <h3> Terima Kasih ! </h3>
                                  <p className="w-75 mb-2 mx-auto text-muted">
                                    Dengan ini saya menyatakan bahwa data yang telah saya isi adalah benar dan kami tidak bertanggung jawab jika terdapat penyalahgunaan data.
                                  </p>
                                  <div className="mb-3">
                                    <div className="custom-control custom-checkbox">
                                      <input type="checkbox" className="custom-control-input" id="sm-arrows-customCheck" />
                                      <label className="custom-control-label" htmlFor="sm-arrows-customCheck"> Saya setuju dengan syarat dan ketentuan yang berlaku </label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-12 text-center mb-2"><button type="button" className="btn btn-success btn-rounded" onClick={this.submit.bind(this)}>Update User</button></div>
                            </div>
                          </div>
                          <hr className="mb-0" />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Dashboard;
