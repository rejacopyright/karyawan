import React, {Component, Fragment} from 'react'
import { Link } from "react-router-dom"
import axios from 'axios'
import con from '../../../con/api'
import { Input, Textarea, Desimal, Radio, Checkbox } from '../../../components/form'
import Select from '../../../components/select'
import Alert from '../../../components/alert'
import Skeleton from 'react-skeleton-loader'

class PayrollGlobal extends Component {
  _isMounted = false;
  state = {
    percent: false,
    value: '',
    allJabatan: true,
    jabatan_id: [],
    alert: false,
    loading: true,
    payroll: false,
  }
  componentDidMount(){
    this._isMounted = true;
    this.payrollId = this.props.match.params.payroll_id;
    this._isMounted && axios.get(con.api+'/payroll/detail/'+this.payrollId, {headers:con.headers}).then(res => {
      this.setState({
        payroll: res.data.payroll,
        allJabatan: res.data.payroll.all_jabatan,
        jabatan_id: res.data.payroll.jabatan_id ? res.data.payroll.jabatan_id.split('|') : [],
        percent: res.data.payroll.percent,
        value: res.data.payroll.value,
        loading: false
      });
      document.title = res.data.payroll.name;
    });
  }
  componentWillUnmount(){
    this._isMounted = false;
  }
  onSelectJabatanChange(e){
    this.setState({jabatan_id: e});
  }
  onPercentChange(e){
    if (this.state.payroll.percent === 1 === e.target.checked) {
      this.value.setState({value: this.state.payroll.value});
      this.setState({percent: e.target.checked, value: this.state.payroll.value});
    }else {
      this.value.setState({value: 0});
      this.setState({percent: e.target.checked, value: 0});
    }
  }
  onAllJabatanChange(e){
    if (this.state.payroll.all_jabatan !== 1 && !e.target.checked) {
      this.setState({allJabatan: e.target.checked, jabatan_id: this.state.payroll.jabatan_id.split('|')});
    }else {
      this.setState({allJabatan: e.target.checked, jabatan_id: []});
    }
  }
  onSubmit(e){
    e.preventDefault();
    const form = e.target, q = {payroll_id: this.payrollId};
    q['all_jabatan'] = form.querySelector('input[name=all_jabatan]').checked ? 1 : null;
    if (!q.all_jabatan) {
      q['jabatan_id'] = this.state.jabatan_id.map(i => i.value || i);
      if (!q.jabatan_id.length) {
        q['all_jabatan'] = 1;
        delete q.jabatan_id;
      }
    }
    q['name'] = form.querySelector('input[name=name]').value;
    q['type'] = form.querySelector('input[name=type]:checked').value;
    q['percent'] = form.querySelector('input[name=percent]').checked ? 1 : null;
    q['value'] = parseFloat(form.querySelector('input[name=value]').value.split('.').join('').replace(',', '.'));
    q['desc'] = form.querySelector('textarea[name=desc]').value;
    // console.log(q.jabatan_id);
    if (q.name && q.value) {
      this.setState({alert: false, loading: true});
      this._isMounted && axios.post(con.api+'/payroll/update', q, {headers:con.headers}).then(res => {
        this.setState({loading:false}, () => {
          this.props.history.push('/payroll/list');
        });
      });
    }else {
      this.setState({alert: true});
    }
  }
  render(){
    if (this.state.loading) {
      return (
        <Fragment>
          <h5 className="pb-2 mb-3 border-bottom border-2">Edit Payroll</h5>
          <Skeleton width="100%" height="20px" count={3} widthRandomness={0} color="#eee" />
          <hr/>
          <Skeleton width="100%" height="50px" count={1} widthRandomness={0} color="#eee" />
          <hr/>
          <div className="row">
            <div className="col text-right">
              <Skeleton width="100px" height="25px" count={1} widthRandomness={0} color="#eee" />
              <span className="mr-2" />
              <Skeleton width="100px" height="25px" count={1} widthRandomness={0} color="#eee" />
            </div>
          </div>
        </Fragment>
      )
    }
    return(
      <form onSubmit={this.onSubmit.bind(this)}>
        <h5 className="pb-2 mb-3 border-bottom border-2">{this.state.payroll.name}</h5>
        {
          this.state.alert &&
          <Alert theme="danger" close icon="exclamation-circle" onClose={() => setTimeout(() => this.setState({alert: false}), 100)}>
            Pastikan Field "Role Name" dan "Value" sudah terisi dengan benar
          </Alert>
        }
        {/* Line 1 */}
        <div className="form-group row">
          <Input sm rowClass="col-md" name="name" title="Roll Name" defaultValue={this.state.payroll.name} placeholder="Roll Name" />
          <div className="col-md-auto">
            <small className="d-block"> Tipe Payroll </small>
            <div className="mt-1">
              <Radio small label="Penambahan" id="increment" name="type" value="1" checked={this.state.payroll.type === 1} labelClass="mr-3" />
              <Radio small label="Pengurangan" id="decrement" name="type" value="0" checked={this.state.payroll.type !== 1} />
            </div>
          </div>
        </div>
        {/* Line 2 */}
        <div className="form-group row">
          <div className="col-12">
            <div className="mt-1">
              <Checkbox small label={`Berlaku untuk semua jabatan`} labelClass="text-nowrap"  id="all_jabatan" name="all_jabatan" value="1" checked={this.state.allJabatan === 1} onChange={this.onAllJabatanChange.bind(this)} />
            </div>
          </div>
          {
            !this.state.allJabatan &&
            <Select name="jabatan_id" defaultValue={`${con.api}/jabatan/multiple?jabatan_id=[${this.state.jabatan_id}]`} sm rowClass="col-12 border-top pt-2 mt-2" title="Pilih Jabatan" url={`${con.api}/jabatan`} param="jabatan" value="jabatan_id" label="name" onChange={this.onSelectJabatanChange.bind(this)} multiple dontClose placeholder="Pilih Jabatan" />
          }
        </div>
        {/* Line 3 */}
        <div className="form-group row">
          <div className="col-md-6">
            <small className="d-block"> Tipe Value </small>
            <div className="mt-1">
              <Checkbox checked={this.state.payroll.percent === 1} small label={`Persentase dari "Basic Salary"`} labelClass="text-nowrap"  id="percent" name="percent" value="1" onChange={this.onPercentChange.bind(this)} />
            </div>
          </div>
          {
            this.state.percent ?
            <Desimal sm ref={i => this.value = i} name="value" rowClass="col-md-6" value={this.state.value} title={`Persentase / bln dari "Basic Salary"`} placeholder={`Persentase dari "Basic Salary"`} max="100" icon="%" right />
            :
            <Desimal sm ref={i => this.value = i} name="value" rowClass="col-md-6" value={this.state.value} title={`Nominal / bln (Rupiah)`} placeholder={`Nominal (Rupiah)`} icon="Rp." />
          }
        </div>
        {/* Line 4 */}
        <div className="row">
          <Textarea sm defaultValue={this.state.payroll.desc} rowClass="col-12" name="desc" title="Deskripsi (Opsional)" placeholder="Deskripsi singkat payroll..." rows={3} />
        </div>
        {/* Submit Button */}
        <div className="row">
          <div className="col-12 mt-3 text-right">
            <Link to="/payroll/list" className="btn btn-xs width-md radius-5 text-muted text-9"><i className="uil uil-times mr-1" />Kembali</Link>
            <button type="submit" className="btn btn-xs width-md radius-5 btn-soft-success"><i className="uil uil-check-circle mr-1" />Proses</button>
          </div>
        </div>
      </form>
    )
  }
}
export default PayrollGlobal
