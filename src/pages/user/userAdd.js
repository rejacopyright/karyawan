import React from 'react';
import { Link } from 'react-router-dom';
import { Input, Textarea, Radio, Checkbox } from '../../components/form';
import axios from 'axios';
import con from '../../con/api';
import fire from '../../con/fire';
// import Avatar from '../../assets/images/users/avatar-1.jpg';
import Select from '../../components/select';
import Notif from '../../components/notif';
import { ClassicSpinner } from "react-spinners-kit";
import '../../assets/libs/smartwizard/smart_wizard_theme_arrows.min.scss';
class Dashboard extends React.Component {
  _isMounted = false;
  state = {
    images:[],
    snackOpen: false,
    msg: '',
    // loading: true
  }
  componentDidMount() {
    this._isMounted = true;
    document.title = 'Add New User';
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
      for (let i of files) {
        const reader = new FileReader();
        reader.onload = () => {
          this.setState({ images: [...this.state.images, {name: i.name, base:reader.result}] });
        }
        reader.readAsDataURL(i);
      }
    }
  }
  removeImage(key){
    const images = [...this.state.images];
    images.splice(key, 1);
    this.setState({ images:images });
  }
  submit(){
    this.setState({ loading: true });
    const form = selector => this.addForm.querySelector(selector);
    const q = {};
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
    q['img'] = this.state.images.map(i => i.base);
    if (q.name && q.email && q.username) {
      axios.post(con.api+'/user/store', q, {headers:con.headers}).then(res => {
        fire.set(Date.now());
        this.setState({ loading: false }, () => this.props.history.goBack());
        console.log(res.data);
      });
    }else {
      this.setState({ loading: false, snackOpen: true, msg:'Mohon cek kembali data yang harus di isi.' });
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
            <div className="row page-title">
              <div className="col-auto">
                <Link to="/user/list"> <h4 className="mb-1 mt-0"> <i className="uil uil-arrow-left" /> Add New User </h4> </Link>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-body p-0">
                    <form action="" className="form-horizontal" ref={i => this.addForm = i}>
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
                              <Input rowClass="col-md form-group" label="Nama Lengkap" name="name" placeholder="Nama Lengkap" />
                              <div className="col-md text-center">
                                <div className="form-group">
                                  <label htmlFor="gender"> Jenis Kelamin </label>
                                  <div className="mt-2">
                                    <Radio label="Mr." id="mr" name="gender" value="1" checked />
                                    <Radio label="Mrs." id="mrs" name="gender" value="0" />
                                  </div>
                                </div>
                              </div>
                              <div className="col-md">
                                <Select name="jabatan_id" bold title="Jabatan" url={`${con.api}/jabatan`} param="jabatan" value="jabatan_id" label="name" onChange={this.onSelectTitleChange.bind(this)} placeholder="Pilih Jabatan..." />
                              </div>
                            </div>
                            <div className="row">
                              <Input rowClass="col-md form-group" label="Nomor Induk" name="nik" placeholder="NIK" />
                              <Input rowClass="col-md form-group" label="Nomor Kartu Keluarga" name="kk" placeholder="KK" />
                              <Input rowClass="col-md form-group" label="Nomor Telp." name="tlp" placeholder="Nomor Telp." />
                            </div>
                            <div className="row">
                              <Textarea rowClass="col-md form-group" label="Alamat" name="alamat" placeholder="Isi Alamat Lengkap..." />
                            </div>
                          </div>
                          <div id="akun-tab">
                            <div className="row">
                              <Input rowClass="col-md form-group" label="Email" name="email" placeholder="Email" />
                              <Input rowClass="col-md form-group" label="Username" name="username" placeholder="Username" />
                            </div>
                            <div className="row">
                              <Input rowClass="col-md form-group" label="Password" name="password" placeholder="Password" />
                              <Input rowClass="col-md form-group" label="Konfirmasi Password" name="password_confirm" placeholder="Konfirmasi Password" />
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
                                    <Checkbox id="agreement" label="Saya setuju dengan syarat dan ketentuan yang berlaku" />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-12 text-center mb-2"><button type="button" className="btn btn-success btn-rounded" onClick={this.submit.bind(this)}>Tambah User</button></div>
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
            { this.state.loading && <div className="overlay center"><ClassicSpinner color="#5369f8" loading={true} /></div> }
            <Notif open={this.state.snackOpen} onClose={() => this.setState({ snackOpen:false })} msg={this.state.msg} theme="danger" />
          </div>
        </div>
      </div>
    );
  }
}
export default Dashboard;
