import React, {Fragment} from 'react'
import axios from "axios"
import con from "../../con/api"
import List from "./list"
import moment from 'moment'
import 'moment/locale/id'
import Skeleton from 'react-skeleton-loader'

const Loading = () => (
  <div className="row align-items-center mb-0 mt-3">
    <div className="col-auto pr-0">
      <Skeleton width="35px" height="35px" count={1} widthRandomness={0} color="#eee" borderRadius="100px" />
    </div>
    <div className="col">
      <Skeleton width="100%" height="10px" count={2} widthRandomness={0} color="#eee" />
    </div>
  </div>
)
class Today extends React.Component {
  _isMounted = false;
  state = {
    user:[],
    loading: true
  }
  componentDidMount() {
    this._isMounted = true;
    this._isMounted && axios.get(con.api+'/absen', {headers:con.headers}).then(res => {
      this.setState({ user: res.data.absen, loading: false });
    });
    document.title = 'Absen Hari Ini';
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  render () {
    return (
      <Fragment>
        <h5 className="mt-3 mb-2 text-10 text-success">List karyawan yang sudah absen hari ini</h5>
        {
          this.state.loading ? [1,2,3].map(key => <Loading key={key} />) :
          this.state.user.map((r, key) => (
            <List key={key} userID={1} userName={r.user.name} userDesc={''} time={moment(r.first_capture).format('HH:mm')} avatar={r.img} />
          ))
        }
      </Fragment>
    )
  }
}

export default Today;
