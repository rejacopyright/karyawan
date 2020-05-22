import React, {Component} from 'react'
import Ptkp from './pph_ptkp'
import Pkp from './pph_pkp'
class Pph extends Component {
  _isMounted = false;
  state = {
    alert: false,
    alertMsg: '',
    loading: false,
    pph:[]
  }
  componentDidMount(){
    this._isMounted = true;
    // this._isMounted && axios.get(con.api+'/payroll/pph', {headers:con.headers}).then(res => {
    //   this.setState({pph: res.data, loading: false});
    // });
    document.title = 'PPH 21';
  }
  render(){
    return(
      <div className="row">
        <div className="col-12">
          <h5 className="py-2 mb-3 mt-0 border-bottom border-2">PPH 21</h5>
          <ul className="nav nav-tabs nav-justifieds bg-white" role="tablist">
            <li className="nav-item"> <a className="nav-link py-1" data-toggle="tab" href="#tabs-ptkp" role="tab" aria-selected="true"> PTKP </a> </li>
            <li className="nav-item"> <a className="nav-link py-1 active" data-toggle="tab" href="#tabs-pkp" role="tab" aria-selected="false"> PKP </a> </li>
          </ul>
          <div className="tab-content">
            <div className="tab-pane" id="tabs-ptkp">
              <Ptkp />
            </div>
            <div className="tab-pane fade show active" id="tabs-pkp">
              <Pkp />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Pph
