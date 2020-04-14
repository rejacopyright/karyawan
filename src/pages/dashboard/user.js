import React from 'react'

class User extends React.Component {
  render () {
    return (
      <div className={`row ${this.props.rowClass}`}>
        <div className="col">
          <div className="card mb-2 shadow-sm">
            <div className="card-body p-0">
              <div className="media p-3">
                <div className="media-body lh-1 text-7 text-nowrap">
                  <div className="text-secondary text-uppercase f-700 border-bottom border-gray pb-1">- Total Karyawan</div>
                  <div className="d-flex align-items-center mt-2">
                    <h2 className="my-0 text-primary">92</h2>
                    <div className="icon-lg icon-dual-primary ml-auto bg-soft-primary p-1 radius-20" data-feather="users"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card mb-2 shadow-sm">
            <div className="card-body p-0">
              <div className="media p-3">
                <div className="media-body lh-1 text-7 text-nowrap">
                  <div className="text-secondary text-uppercase f-700 border-bottom border-gray pb-1">- Karyawan Aktif</div>
                  <div className="d-flex align-items-center mt-2">
                    <h2 className="my-0 text-success">80</h2>
                    <div className="icon-lg icon-dual-success ml-auto bg-soft-success p-1 radius-20" data-feather="user-check"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card mb-2 shadow-sm">
            <div className="card-body p-0">
              <div className="media p-3">
                <div className="media-body lh-1 text-7 text-nowrap">
                  <div className="text-secondary text-uppercase f-700 border-bottom border-gray pb-1">- Karyawan Cuti</div>
                  <div className="d-flex align-items-center mt-2">
                    <h2 className="my-0 text-warning">1</h2>
                    <div className="icon-lg icon-dual-warning ml-auto bg-soft-warning p-1 radius-20" data-feather="users"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card mb-2 shadow-sm">
            <div className="card-body p-0">
              <div className="media p-3">
                <div className="media-body lh-1 text-7 text-nowrap">
                  <div className="text-secondary text-uppercase f-700 border-bottom border-gray pb-1">- Karyawan Pulang</div>
                  <div className="d-flex align-items-center mt-2">
                    <h2 className="my-0 text-info">2</h2>
                    <div className="icon-lg icon-dual-info ml-auto bg-soft-info p-1 radius-20" data-feather="user-check"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card mb-2 shadow-sm">
            <div className="card-body p-0">
              <div className="media p-3">
                <div className="media-body lh-1 text-7 text-nowrap">
                  <div className="text-secondary text-uppercase f-700 border-bottom border-gray pb-1">- Karyawan Telat</div>
                  <div className="d-flex align-items-center mt-2">
                    <h2 className="my-0 text-secondary">5</h2>
                    <div className="icon-lg icon-dual-gray ml-auto bg-light p-1 radius-20" data-feather="user-x"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card mb-2 shadow-sm">
            <div className="card-body p-0">
              <div className="media p-3">
                <div className="media-body lh-1 text-7 text-nowrap">
                  <div className="text-secondary text-uppercase f-700 border-bottom border-gray pb-1">- Karyawan Absen</div>
                  <div className="d-flex align-items-center mt-2">
                    <h2 className="my-0 text-danger">4</h2>
                    <div className="icon-lg icon-dual-danger ml-auto bg-soft-danger p-1 radius-20" data-feather="user-x"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default User;
