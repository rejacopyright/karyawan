import React, {Component, Fragment} from 'react'
import axios from 'axios'
import con from '../../con/api'
import Skeleton from 'react-skeleton-loader'
import Avatar from '../../assets/images/users/avatar.png'
import RightBar from '../../components/rightBar';

// Form
import {Input} from '../../components/form'

const Menu = () => (
    <Fragment>
      <div className="btn-group mb-2">
        <button type="button" className="btn btn-light" data-toggle="tooltip" data-placement="top" title="Mark as spam"><i className="uil uil-exclamation-octagon"></i></button>
        <button type="button" className="btn btn-light" data-toggle="tooltip" data-placement="top" title="Delete"><i className="uil uil-trash-alt"></i></button>
      </div>
      <div className="btn-group mb-2" data-toggle="tooltip" data-placement="top" title="Folder">
        <button type="button" className="btn btn-light dropdown-toggle" data-toggle="dropdown" aria-expanded="false"> <i className="uil uil-folder"></i> <i className="uil uil-angle-down"></i> </button>
        <div className="dropdown-menu">
          <span className="dropdown-header">Move to</span>
          <a className="dropdown-item" href="##">Social</a>
          <a className="dropdown-item" href="##">Promotions</a>
          <a className="dropdown-item" href="##">Updates</a>
          <a className="dropdown-item" href="##">Forums</a>
        </div>
      </div>
      <div className="btn-group  mb-2" data-toggle="tooltip" data-placement="top" title="More Actions">
        <button type="button" className="btn btn-light dropdown-toggle" data-toggle="dropdown" aria-expanded="false"> More <i className="uil uil-angle-down"></i> </button>
        <div className="dropdown-menu">
          <span className="dropdown-header">More Option :</span>
          <a className="dropdown-item" href="##">Mark as Unread</a>
          <a className="dropdown-item" href="##">Add to Tasks</a>
          <a className="dropdown-item" href="##">Add Star</a>
          <a className="dropdown-item" href="##">Mute</a>
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
    users_self:{},
    loading:true
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
    this.setState({ users_self:user });
  }
  render(){
    return(
      <Fragment>
        <RightBar title={this.state.users_self.name}>
          <Input name="u_pokok" title="Gaji Pokok" placeholder="Gaji Pokok" defaultValue={this.state.users_self.u_pokok} rowClass="mb-3" />
          <Input name="u_transport" title="Uang Transportasi" placeholder="Uang Transportasi" defaultValue={this.state.users_self.u_transport} rowClass="mb-3" />
          <Input name="u_makan" title="Uang Makan" placeholder="Uang Makan" defaultValue={this.state.users_self.u_makan} rowClass="mb-3" />
          <Input name="u_anis" title="Tunjangan Anak Istri" placeholder="Tunjangan Anak Istri" defaultValue={this.state.users_self.u_anis} rowClass="mb-3" />
          {this.state.users_self.name}
        </RightBar>
        <Menu />
        <div className="row mt-2">
          <div className="col-12">
            { this.state.loading && <Loading /> }
            {
              this.state.users.map((r, key) => (
                <ul className="message-list mb-1" key={key}>
                  <li className="h-unset lh-unset radius-50">
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
                        <div className="text-primary text-nowrap f-600">{r.name}</div>
                      </div>
                      <div className="col text-truncate">
                        <div className="subject text-truncate f-200">
                          Description...
                        </div>
                      </div>
                      <div className="col-auto text-right text-success text-8">01:30 AM</div>
                      <div className="col-auto pr-0">
                        <div data-toggle="tooltip" data-placement="top" title="Folder">
                          <span className="btn btn-xs btn-soft-primary radius-20 pointer same-25 p-0 center dropdown-toggle"> <i className="uil uil-angle-right"></i> </span>
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
