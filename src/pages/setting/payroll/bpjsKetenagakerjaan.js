import React, {Component} from 'react'
import { Link } from "react-router-dom"
import axios from 'axios'
import con from '../../../con/api'
import { Desimal } from '../../../components/form'
import Alert from '../../../components/alert'
import StickyBottom from '../../../components/stickyBottom'
import { ClassicSpinner } from 'react-spinners-kit'

class BPJSKetenagakerjaan extends Component {
  _isMounted = false;
  state = {
    alert: false,
    alertMsg: '',
    loading: true,
    bpjs:[]
  }
  componentDidMount(){
    this._isMounted = true;
    this._isMounted && axios.get(con.api+'/payroll/bpjs/ketenagakerjaan', {headers:con.headers}).then(res => {
      this.setState({bpjs: res.data, loading: false});
    });
    document.title = 'BPJS Ketenagakerjaan';
  }
  componentWillUnmount(){
    this._isMounted = false;
  }
  onSubmit(e){
    e.preventDefault();
    const form = e.target, q = {};
    // JHT
    const jht_company = form.querySelector('input[name=jht_company]').value;
    const jht_employee = form.querySelector('input[name=jht_employee]').value;
    const jht_min = form.querySelector('input[name=jht_min]').value;
    const jht_max = form.querySelector('input[name=jht_max]').value;
    if (jht_company) { q['jht_company'] = parseFloat(jht_company.split('.').join('').replace(',', '.')); }
    if (jht_employee) { q['jht_employee'] = parseFloat(jht_employee.split('.').join('').replace(',', '.')); }
    if (jht_min) { q['jht_min'] = parseFloat(jht_min.split('.').join('').replace(',', '.')); }
    if (jht_max) { q['jht_max'] = parseFloat(jht_max.split('.').join('').replace(',', '.')); }
    // JKK
    const jkk_company = form.querySelector('input[name=jkk_company]').value;
    const jkk_employee = form.querySelector('input[name=jkk_employee]').value;
    const jkk_min = form.querySelector('input[name=jkk_min]').value;
    const jkk_max = form.querySelector('input[name=jkk_max]').value;
    if (jkk_company) { q['jkk_company'] = parseFloat(jkk_company.split('.').join('').replace(',', '.')); }
    if (jkk_employee) { q['jkk_employee'] = parseFloat(jkk_employee.split('.').join('').replace(',', '.')); }
    if (jkk_min) { q['jkk_min'] = parseFloat(jkk_min.split('.').join('').replace(',', '.')); }
    if (jkk_max) { q['jkk_max'] = parseFloat(jkk_max.split('.').join('').replace(',', '.')); }
    // JKM
    const jkm_company = form.querySelector('input[name=jkm_company]').value;
    const jkm_employee = form.querySelector('input[name=jkm_employee]').value;
    const jkm_min = form.querySelector('input[name=jkm_min]').value;
    const jkm_max = form.querySelector('input[name=jkm_max]').value;
    if (jkm_company) { q['jkm_company'] = parseFloat(jkm_company.split('.').join('').replace(',', '.')); }
    if (jkm_employee) { q['jkm_employee'] = parseFloat(jkm_employee.split('.').join('').replace(',', '.')); }
    if (jkm_min) { q['jkm_min'] = parseFloat(jkm_min.split('.').join('').replace(',', '.')); }
    if (jkm_max) { q['jkm_max'] = parseFloat(jkm_max.split('.').join('').replace(',', '.')); }
    // JP
    const jp_company = form.querySelector('input[name=jp_company]').value;
    const jp_employee = form.querySelector('input[name=jp_employee]').value;
    const jp_min = form.querySelector('input[name=jp_min]').value;
    const jp_max = form.querySelector('input[name=jp_max]').value;
    if (jp_company) { q['jp_company'] = parseFloat(jp_company.split('.').join('').replace(',', '.')); }
    if (jp_employee) { q['jp_employee'] = parseFloat(jp_employee.split('.').join('').replace(',', '.')); }
    if (jp_min) { q['jp_min'] = parseFloat(jp_min.split('.').join('').replace(',', '.')); }
    if (jp_max) { q['jp_max'] = parseFloat(jp_max.split('.').join('').replace(',', '.')); }
    // STORE
    this.setState({alert: false, loading: true});
    axios.post(con.api+'/payroll/bpjs/ketenagakerjaan/update', q, {headers:con.headers}).then(res => {
      console.log(res.data);
      this.setState({bpjs: res.data, loading:false});
    }).catch(() => this.setState({alert: true, loading: false, alertMsg: 'Terjadi masalah pada koneksi. Mohon ulangi kembali dalam beberapa saat..'}));
  }
  render(){
    return(
      <form onSubmit={this.onSubmit.bind(this)}>
        { this.state.loading && <div className="overlay center"><ClassicSpinner color="#5369f8" loading={true} /></div> }
        <h5 className="py-2 mb-3 mt-0 border-bottom border-2">BPJS Ketenagakerjaan</h5>
        {
          this.state.alert &&
          <Alert theme="danger" close onClose={() => setTimeout(() => this.setState({alert: false}), 100)}>
            {this.state.alertMsg}
          </Alert>
        }
        <Alert theme="success" icon="false">
          Roll umum untuk pengaturan BPJS Ketenagakerjaan adalah : <br/>
          <ol className="m-0 pl-4">
            <li> <strong>JHT</strong> : Company Rate <strong>"3,7%"</strong>, Employee Rate <strong>"2%"</strong>, Min. <strong>"UMR/UMK"</strong>, Max. <strong>"Unlimited"</strong></li>
            <li> <strong>JKK</strong> : Company Rate <strong>"0,24% (Very Low Risk)", "0,54% (Low Risk)", "0,89% (Moderate)", "1,27% (High Risk)", "1,74% (Very High Risk)"</strong>, Min. <strong>"UMR/UMK"</strong>, Max. <strong>"Unlimited"</strong></li>
            <li> <strong>JKM</strong> : Company Rate <strong>"0,3%"</strong>, Min. <strong>"UMR/UMK"</strong>, Max. <strong>"Unlimited"</strong></li>
            <li> <strong>JP</strong> : Company Rate <strong>"2%"</strong>, Employee Rate <strong>"1%"</strong>, Min. <strong>"UMR/UMK"</strong>, Max. <strong>"Rp. 8.939.700"</strong></li>
          </ol>
        </Alert>
        {/* Submit Button */}
        <StickyBottom>
          <Link to="/payroll/list" className="btn btn-xs width-md radius-5 text-light text-9"><i className="uil uil-times mr-1" />Kembali</Link>
          <button type="submit" className="btn btn-xs width-md radius-5 btn-soft-info"><i className="uil uil-check-circle mr-1" />Simpan Perubahan</button>
        </StickyBottom>
        <div className="row sticky-bottom-container pt-3">
          {/* JHT */}
          <div className="col-md-6">
            <div className="shadow-xl p-3 radius-10 mb-4">
              <div className="row">
                <div className="col-12">
                  <h6 className="mt-0 border-bottom border-2 pb-2">Jaminan Hari Tua (JHT)</h6>
                </div>
                <Desimal sm rowClass="col-md-6 mb-2" name="jht_company" value={this.state.bpjs.jht_company} title="Company" placeholder="0" max="100" icon="%" right />
                <Desimal sm rowClass="col-md-6 mb-2" name="jht_employee" value={this.state.bpjs.jht_employee} title="Employee" placeholder="0" max="100" icon="%" right />
                <Desimal sm rowClass="col-12 mb-2" name="jht_min" value={this.state.bpjs.jht_min} title="Min." placeholder="0" icon="Rp. " />
                <Desimal sm rowClass="col-12" name="jht_max" value={this.state.bpjs.jht_max} title="Max." placeholder="0" icon="Rp. " />
              </div>
            </div>
          </div>
          {/* JKK */}
          <div className="col-md-6">
            <div className="shadow-xl p-3 radius-10 mb-4">
              <div className="row">
                <div className="col-12">
                  <h6 className="mt-0 border-bottom border-2 pb-2">Jaminan Kecelakaan Kerja (JKK)</h6>
                </div>
                <Desimal sm rowClass="col-md-6 mb-2" name="jkk_company" value={this.state.bpjs.jkk_company} title="Company" placeholder="0" max="100" icon="%" right />
                <Desimal sm rowClass="col-md-6 mb-2" name="jkk_employee" value={this.state.bpjs.jkk_employee} title="Employee" placeholder="0" max="100" icon="%" right />
                <Desimal sm rowClass="col-12 mb-2" name="jkk_min" value={this.state.bpjs.jkk_min} title="Min." placeholder="0" icon="Rp. " />
                <Desimal sm rowClass="col-12" name="jkk_max" value={this.state.bpjs.jkk_max} title="Max." placeholder="0" icon="Rp. " />
              </div>
            </div>
          </div>
          {/* JKM */}
          <div className="col-md-6">
            <div className="shadow-xl p-3 radius-10 mb-3">
              <div className="row">
                <div className="col-12">
                  <h6 className="mt-0 border-bottom border-2 pb-2">Jaminan Kematian (JKM)</h6>
                </div>
                <Desimal sm rowClass="col-md-6 mb-2" name="jkm_company" value={this.state.bpjs.jkm_company} title="Company" placeholder="0" max="100" icon="%" right />
                <Desimal sm rowClass="col-md-6 mb-2" name="jkm_employee" value={this.state.bpjs.jkm_employee} title="Employee" placeholder="0" max="100" icon="%" right />
                <Desimal sm rowClass="col-12 mb-2" name="jkm_min" value={this.state.bpjs.jkm_min} title="Min." placeholder="0" icon="Rp. " />
                <Desimal sm rowClass="col-12" name="jkm_max" value={this.state.bpjs.jkm_max} title="Max." placeholder="0" icon="Rp. " />
              </div>
            </div>
          </div>
          {/* JP */}
          <div className="col-md-6">
            <div className="shadow-xl p-3 radius-10 mb-3">
              <div className="row">
                <div className="col-12">
                  <h6 className="mt-0 border-bottom border-2 pb-2">Jaminan Pensiun (JP)</h6>
                </div>
                <Desimal sm rowClass="col-md-6 mb-2" name="jp_company" value={this.state.bpjs.jp_company} title="Company" placeholder="0" max="100" icon="%" right />
                <Desimal sm rowClass="col-md-6 mb-2" name="jp_employee" value={this.state.bpjs.jp_employee} title="Employee" placeholder="0" max="100" icon="%" right />
                <Desimal sm rowClass="col-12 mb-2" name="jp_min" value={this.state.bpjs.jp_min} title="Min." placeholder="0" icon="Rp. " />
                <Desimal sm rowClass="col-12" name="jp_max" value={this.state.bpjs.jp_max} title="Max." placeholder="0" icon="Rp. " />
              </div>
            </div>
          </div>
        </div>
      </form>
    )
  }
}
export default BPJSKetenagakerjaan
