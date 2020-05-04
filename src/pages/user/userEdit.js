import React from 'react';
import {Link} from 'react-router-dom';
import { Input, Textarea, Radio, Checkbox } from '../../components/form';
import axios from 'axios';
import con from '../../con/api';
import fire from '../../con/fire';
// import Avatar from '../../assets/images/users/avatar-1.jpg';
import Select from '../../components/select';
import { ClassicSpinner } from "react-spinners-kit";
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
    this._isMounted && axios.get(con.api+'/user/detail/'+userId, {headers:con.headers}).then(res => {
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
    this._isMounted = false;
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
    this.setState({ loading: true });
    const form = selector => this.editForm.querySelector(selector);
    const q = {user_id:this.state.user.user_id};
    q['name'] = form('input[name=name]').value;
    q['gender'] = form('input[name=gender]:checked').value;
    q['jabatan_id'] = form('input[name=jabatan_id]').value;
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
      axios.post(con.api+'/user/update', q, {headers:con.headers}).then(res => {
        fire.set(Date.now());
        this.setState({ loading: false }, () => this.props.history.goBack());
      });
    }
  }
  onSelectTitleChange(e){
    // console.log(e);
  }
  render() {
    return (
      <div className="content-page">
        <div className="content">
          <div className="container-fluid">
            <div className="row page-title px-3 pb-0">
              <div className="col-auto">
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
                              <Input rowClass="col-md form-group" name="name" label="Nama Lengkap" defaultValue={this.state.user.name} placeholder="Nama Lengkap" />
                              <div className="col-md text-center">
                                <div className="form-group">
                                  <label htmlFor="gender"> Jenis Kelamin </label>
                                  {
                                    !this.state.loading &&
                                    <div className="mt-2">
                                      <Radio label="Mr." id="mr" name="gender" value="1" checked={this.state.user.gender === 1} />
                                      <Radio label="Mrs." id="mrs" name="gender" value="0" checked={this.state.user.gender === 0} />
                                    </div>
                                  }
                                </div>
                              </div>
                              <div className="col-md">
                                {
                                  !this.state.loading && <Select name="jabatan_id" defaultValue={`${con.api}/jabatan/detail/${this.state.user.jabatan_id}`} bold title="Jabatan" url={`${con.api}/jabatan`} param="jabatan" value="jabatan_id" label="name" onChange={this.onSelectTitleChange.bind(this)} placeholder="Pilih Jabatan..." />
                                }
                              </div>
                              {/* <Input rowClass="col-md form-group" label="Jabatan" name="job" defaultValue={this.state.user.jabatan_id} placeholder="Jabatan" /> */}
                            </div>
                            <div className="row">
                              <Input rowClass="col-md form-group" label="Nomor Induk" name="nik" defaultValue={this.state.user.nik} placeholder="NIK" />
                              <Input rowClass="col-md form-group" label="Nomor Kartu Keluarga" name="kk" defaultValue={this.state.user.kk} placeholder="KK" />
                              <Input rowClass="col-md form-group" label="Nomor Telp." name="tlp" defaultValue={this.state.user.tlp} placeholder="Nomor Telp." />
                            </div>
                            <div className="row">
                              <Textarea rowClass="col-md form-group" label="Alamat" name="alamat" defaultValue={this.state.user.alamat} placeholder="Isi Alamat Lengkap..." />
                            </div>
                          </div>
                          <div id="akun-tab">
                            <div className="row">
                              <Input rowClass="col-md form-group" label="Email" name="email" defaultValue={this.state.user.email} placeholder="Email" />
                              <Input rowClass="col-md form-group" label="Username" name="username" defaultValue={this.state.user.username} placeholder="Username" />
                            </div>
                            <div className="row">
                              <Input rowClass="col-md form-group" label="Ubah Password" name="password" placeholder="Password" password />
                              <Input rowClass="col-md form-group" label="Konfirmasi Password" name="password_confirm" placeholder="Konfirmasi Password" password />
                            </div>
                          </div>
                          <div id="pictures-tab">
                            <div className="row">
                              <div className="col-md-auto text-center mb-3">
                                <div className="h-100 center">
                                  <div className="same-100 pointer mx-auto oh p-2 center border border-gray border-dashed radius-20" onClick={this.browseImage.bind(this)}>
                                    <input type="file" accept="image/png, image/jpeg" className="d-none" multiple={true} onChange={this.changeImage.bind(this)} />
                                    <i className="uil uil-image-plus h3 text-gray"></i>
                                  </div>
                                </div>
                              </div>
                              {
                                this.state.images.map((r, key) => (
                                  <div className="col-md-auto text-center mb-3" key={key}>
                                    {/* <div className="same-200 mx-auto oh p-2 position-relative d-flex align-items-center justify-content-center border border-gray border-1 border-dashed radius-20">
                                      <img className="w-100 img-avatar radius-5" src={r.base} alt="" />
                                    </div> */}
                                    <div className="h-100 center">
                                      <div className="position-relative">
                                        <div className="position-absolute same-25 radius-20 bg-light pointer" onClick={this.removeImage.bind(this, key)} style={{ top: -10, right: -10 }}><i className="uil uil-times text-dark" /></div>
                                        <img className="wpx-100 img-avatar radius-10" src={r.base} alt="" />
                                      </div>
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
                                    <Checkbox rowClass="mb-3" id="agreement" label="Saya setuju dengan syarat dan ketentuan yang berlaku" />
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
          { this.state.loading && <div className="overlay center"><ClassicSpinner color="#5369f8" loading={true} /></div> }
        </div>
      </div>
    );
  }
}
export default Dashboard;
