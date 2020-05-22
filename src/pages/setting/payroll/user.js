import React, {Component, Fragment} from 'react'
import axios from 'axios'
import con from '../../../con/api'
import Skeleton from 'react-skeleton-loader'
import Avatar from '../../../assets/images/users/avatar.png'
import RightBar from '../../../components/rightBar';

// Form
import { ClassicSpinner } from "react-spinners-kit";
import { Desimal } from '../../../components/form'

const Menu = () => (
    <Fragment>
      <div className="btn-group my-2" style={{marginLeft: '-.6rem'}}>
        <button type="button" className="btn btn-sm text-dark" data-toggle="tooltip" data-placement="top" title="Mark as spam"><i className="uil uil-exclamation-octagon"></i></button>
        <button type="button" className="btn btn-sm text-dark" data-toggle="tooltip" data-placement="top" title="Delete"><i className="uil uil-trash-alt"></i></button>
        <button type="button" className="btn btn-sm text-dark dropdown-toggle" data-toggle="dropdown" aria-expanded="false"> <i className="uil uil-folder"></i> <i className="uil uil-angle-down"></i> </button>
        <div className="dropdown-menu">
          <span className="dropdown-header">Move to</span>
          <a className="dropdown-item" href="##">Social</a>
          <a className="dropdown-item" href="##">Promotions</a>
          <a className="dropdown-item" href="##">Updates</a>
          <a className="dropdown-item" href="##">Forums</a>
        </div>
      </div>
    </Fragment>
  );
const Loading = () => {
  return [1,2,3,4].map(key => (
    <div className="row align-items-center mb-0 mt-2" key={key}>
      <div className="col-auto pr-0">
        <Skeleton width="35px" height="35px" count={1} widthRandomness={0} color="#eee" borderRadius="100px" />
      </div>
      <div className="col">
        <Skeleton width="100%" height="10px" count={2} widthRandomness={0} color="#eee" />
      </div>
    </div>
  ))
}
class PayrollUser extends Component {
  _isMounted = false;
  state = {
    users:[],
    users_page:1,
    users_search:'',
    user_self:{},
    loading:true,
    loadingUpdate:false
  }
  componentDidMount(){
    this._isMounted = true;
    document.title = 'User Payroll';
    this._isMounted && axios.get(con.api+'/user', {headers:con.headers, params:{page:this.state.users_page, noBase:true}}).then(res => {
      this.setState({ users:res.data.user, loading:false });
    });
  }
  slideToggle(userId){
    const user = this.state.users.find(i => i.user_id === userId);
    this.setState({ user_self:user });
  }
  payrollUpdate(e){
    e.preventDefault();
    this.setState({loadingUpdate: true});
    const q = {user_id : this.state.user_self.user_id};
    const form = this.payrollUpdateForm;
    q['u_pokok'] = parseInt(form.querySelector('input[name=u_pokok]').value.split('.').join(''));
    q['u_transport'] = parseInt(form.querySelector('input[name=u_transport]').value.split('.').join(''));
    q['u_makan'] = parseInt(form.querySelector('input[name=u_makan]').value.split('.').join(''));
    q['u_anis'] = parseInt(form.querySelector('input[name=u_anis]').value.split('.').join(''));
    axios.post(con.api+'/user/update', q, {headers:con.headers}).then(res => {
      this.setState({ user_self: res.data.update, users: res.data.user, loadingUpdate: false });
    });
  }
  render(){
    return(
      <Fragment>
        <RightBar title={this.state.user_self.name}>
          <form ref={i => this.payrollUpdateForm = i} onSubmit={this.payrollUpdate.bind(this)}>
            {
              this.state.user_self.img &&
              <div className="d-block text-center border-top border-bottom py-2 mb-3">
                <div className="same-75 radius-100 mx-auto center oh border border-1 border-gray bg-img mb-2" style={{ backgroundImage: `url('${con.img}/user/thumb/${this.state.user_self.img[0].name}')` }} />
                <span className="f-600">{this.state.user_self.name} </span>
                <span className="f-200 text-muted">| {this.state.user_self.username}</span>
              </div>
            }
            <Desimal name="u_pokok" title="Gaji Pokok" placeholder="Gaji Pokok" value={Object.values(this.state.user_self).length && this.state.user_self.u_pokok} rowClass="mb-2" icon="Rp." />
            <Desimal name="u_transport" title="Uang Transportasi" placeholder="Uang Transportasi" value={Object.values(this.state.user_self).length && this.state.user_self.u_transport} rowClass="mb-2" icon="Rp." />
            <Desimal name="u_makan" title="Uang Makan" placeholder="Uang Makan" value={Object.values(this.state.user_self).length && this.state.user_self.u_makan} rowClass="mb-2" icon="Rp." />
            <Desimal name="u_anis" title="Tunjangan Anak Istri" placeholder="Tunjangan Anak Istri" value={Object.values(this.state.user_self).length && this.state.user_self.u_anis} rowClass="mb-2" icon="Rp." />
            <div className="row position-absolute w-100 b-0 py-2">
              <div className="col text-center">
                <button type="submit" className="btn btn-block btn-sm radius-20 btn-soft-success">Update Perubahan</button>
              </div>
            </div>
          </form>
          { this.state.loadingUpdate && <div className="overlay-absolute center"><ClassicSpinner color="#5369f8" loading={true} /></div> }
        </RightBar>
        <Menu />
        <div className="row">
          <div className="col-12">
            <h5 className="pb-2 mb-3 border-bottom border-2">User's View</h5>
            { this.state.loading && <Loading /> }
            {
              this.state.users.map((r, key) => (
                <ul className="message-list mb-1" key={key}>
                  <li className="h-unset lh-unset radius-5">
                    <div className="row m-0 p-2 align-items-center right-bar-toggle pointer" onClick={this.slideToggle.bind(this, r.user_id)}>
                      <div className="col-auto px-0">
                        {
                          r.img.length ?
                          <div className="same-25 radius-100 center oh border border-gray bg-img" style={{ backgroundImage: `url('${con.img}/user/thumb/${r.img[0].name}')` }} />
                          :
                          <span className="same-25 radius-100 center oh border border-gray"> <img src={Avatar} alt="" className="h-100"/> </span>
                        }
                      </div>
                      <div className="col">
                        <div className="text-dark text-9 text-nowrap f-600 lh-1">{r.name}</div>
                        <div className="text-muted text-8 text-nowrap f-600 lh-1">{r.username}</div>
                      </div>
                      <div className="col text-truncate">
                        <div className="subject text-truncate text-9 f-600">
                          Rp. {(parseInt(r.u_pokok) + parseInt(r.u_transport) + parseInt(r.u_makan) + parseInt(r.u_anis)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}
                        </div>
                      </div>
                      <div className="col-auto text-right text-muted text-8">01:30 AM</div>
                      <div className="col-auto pr-0">
                        <div data-toggle="tooltip" data-placement="top" title="Folder">
                          <span className="btn btn-xs text-dark radius-20 pointer same-25 p-0 center dropdown-toggle"> <i className="uil uil-angle-right"></i> </span>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              ))
            }
          </div>
        </div>
      </Fragment>
    )
  }
}
export default PayrollUser
