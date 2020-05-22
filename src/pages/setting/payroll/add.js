import React, {Component} from 'react'
import { Link } from "react-router-dom"
import axios from 'axios'
import con from '../../../con/api'
import { Input, Textarea, Desimal, Radio, Checkbox } from '../../../components/form'
import Select from '../../../components/select'
import Alert from '../../../components/alert'
import { ClassicSpinner } from 'react-spinners-kit'

class PayrollGlobal extends Component {
  state = {
    percent: false,
    allJabatan: true,
    jabatan_id: [],
    alert: false,
    loading: false,
  }
  componentDidMount(){
    document.title = 'Add Payroll';
  }
  onSelectJabatanChange(e){
    this.setState({jabatan_id: e});
  }
  onPercentChange(e){
    this.value.setState({value: 0});
    this.setState({percent: e.target.checked});
  }
  onAllJabatanChange(e){
    this.setState({allJabatan: e.target.checked, jabatan_id: []});
  }
  onSubmit(e){
    e.preventDefault();
    const form = e.target, q = {};
    q['all_jabatan'] = form.querySelector('input[name=all_jabatan]').checked ? 1 : null;
    if (!q.all_jabatan) {
      q['jabatan_id'] = this.state.jabatan_id.map(i => i.value);
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
    if (q.name && q.value) {
      this.setState({alert: false, loading: true});
      axios.post(con.api+'/payroll/store', q, {headers:con.headers}).then(res => {
        this.setState({loading:false}, () => {
          this.props.history.push('/payroll/list');
        });
      });
    }else {
      this.setState({alert: true});
    }
  }
  render(){
    return(
      <form onSubmit={this.onSubmit.bind(this)}>
        { this.state.loading && <div className="overlay center"><ClassicSpinner color="#5369f8" loading={true} /></div> }
        <h5 className="py-2 mb-3 mt-0 border-bottom border-2">Add Payroll</h5>
        {
          this.state.alert &&
          <Alert theme="danger" close icon="exclamation-circle" onClose={() => setTimeout(() => this.setState({alert: false}), 100)}>
            Pastikan Field "Role Name" dan "Value" sudah terisi dengan benar
          </Alert>
        }
        {/* Line 1 */}
        <div className="form-group row">
          <Input sm rowClass="col-md" name="name" title="Roll Name" placeholder="Roll Name" />
          <div className="col-md-auto">
            <small className="d-block"> Tipe Payroll </small>
            <div className="mt-1">
              <Radio small label="Penambahan" id="increment" name="type" value="1" checked labelClass="mr-3" />
              <Radio small label="Pengurangan" id="decrement" name="type" value="0" />
            </div>
          </div>
        </div>
        {/* Line 2 */}
        <div className="form-group row">
          <div className="col-12">
            <div className="mt-1">
              <Checkbox small label={`Berlaku untuk semua jabatan`} labelClass="text-nowrap"  id="all_jabatan" name="all_jabatan" value="1" checked onChange={this.onAllJabatanChange.bind(this)} />
            </div>
          </div>
          {
            !this.state.allJabatan &&
            <Select name="jabatan_id" sm rowClass="col-12 border-top pt-2 mt-2" title="Pilih Jabatan" url={`${con.api}/jabatan`} param="jabatan" value="jabatan_id" label="name" onChange={this.onSelectJabatanChange.bind(this)} multiple dontClose placeholder="Pilih Jabatan" />
            // <Select name="jabatan_id" defaultValue={`${con.api}/jabatan/multiple?jabatan_id=[${[10, 4]}]`} sm rowClass="col-12 border-top pt-2 mt-2" title="Pilih Jabatan" url={`${con.api}/jabatan`} param="jabatan" value="jabatan_id" label="name" onChange={this.onSelectJabatanChange.bind(this)} multiple dontClose placeholder="Pilih Jabatan" />
          }
        </div>
        {/* Line 3 */}
        <div className="form-group row">
          <div className="col-md-6">
            <small className="d-block"> Tipe Value </small>
            <div className="mt-1">
              <Checkbox small label={`Persentase dari "Basic Salary"`} labelClass="text-nowrap"  id="percent" name="percent" value="1" onChange={this.onPercentChange.bind(this)} />
            </div>
          </div>
          {
            this.state.percent ?
            <Desimal sm ref={i => this.value = i} name="value" rowClass="col-md-6" title={`Persentase / bln dari "Basic Salary"`} placeholder={`Persentase dari "Basic Salary"`} value={''} max="100" icon="%" right />
            :
            <Desimal sm ref={i => this.value = i} name="value" rowClass="col-md-6" title={`Nominal / bln (Rupiah)`} placeholder={`Nominal (Rupiah)`} value={''} icon="Rp." />
          }
        </div>
        {/* Line 4 */}
        <div className="row">
          <Textarea sm rowClass="col-12" name="desc" title="Deskripsi (Opsional)" placeholder="Deskripsi singkat payroll..." rows={3} />
        </div>
        {/* Submit Button */}
        <div className="row">
          <div className="col-12 mt-3 text-right">
            <Link to="/payroll/list" className="btn btn-xs width-md radius-5 text-muted text-9"><i className="uil uil-times mr-1" />Kembali</Link>
            <button type="submit" className="btn btn-xs width-md radius-5 btn-soft-primary"><i className="uil uil-check-circle mr-1" />Proses</button>
          </div>
        </div>
      </form>
    )
  }
}
export default PayrollGlobal
