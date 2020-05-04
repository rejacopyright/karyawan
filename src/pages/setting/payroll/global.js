import React, {Component} from 'react'
import { Desimal } from '../../../components/form'
// import axios from 'axios'
// import con from '../../con/api'

class PayrollGlobal extends Component {
  componentDidMount(){
    document.title = 'Global Payroll';
  }
  render(){
    return(
      <div className="row">
        <div className="col-12">
          <h5 className="pb-2 mb-3 border-bottom border-2">Global Payroll</h5>
          <div className="alert bg-soft-success text-success border-success alert-dismissible fade show center-left py-1 px-3">
            <i className="uil uil-check-circle text-9" />
            <div className="px-2 text-10">
              Global payroll merupakan pengaturan yang rata untuk seluruh karyawan juga dari persentase payroll user.
            </div>
            <div className="ml-auto pointer" data-dismiss="alert"> <i className="uil uil-times text-9" /> </div>
          </div>
        </div>
        <Desimal sm rowClass="col-md-4 form-group" name="u_lembur" title="Uang Lembur / Jam" placeholder="Uang Lembur" value={''} max="100" icon="%" right />
        <Desimal sm rowClass="col-md-4 form-group" name="u_telat" title="Potongan Keterlambatan / Jam" placeholder="Potongan Keterlambatan" value={''} max="100" icon="%" right />
        <Desimal sm rowClass="col-md-4 form-group" name="u_dinas" title="Uang Dinas / Hari" placeholder="Uang Dinas" value={''} icon="Rp." />
        <Desimal sm rowClass="col-md-4 form-group" name="u_thr" title="Tunjangan Hari Raya / Tahun" placeholder="Tunjangan Hari Raya" value={''} max="100" icon="%" right />
        <Desimal sm rowClass="col-md-4 form-group" name="u_bonus" title="Bonus / Tahun" placeholder="Bonus" value={''} icon="Rp." />
      </div>
    )
  }
}
export default PayrollGlobal
