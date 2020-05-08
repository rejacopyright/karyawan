import React from 'react'

class User extends React.Component {
  render () {
    return (
      <div className={`${this.props.divClass}`}>
        <div className="card mb-2 shadow-sm">
          <div className="card-body p-0">
            <div className="media p-3">
              <div className="media-body lh-1 text-7 text-nowrap">
                <div className="text-secondary text-uppercase f-700 border-bottom border-gray pb-1">{this.props.title}</div>
                <div className="d-flex align-items-center mt-2">
                  <h2 className={`my-0 text-${this.props.theme || 'muted'}`}>{this.props.value}</h2>
                  <div className={`icon-lg icon-dual-${this.props.theme || 'muted'} ml-auto bg-soft-${this.props.theme || 'muted'} p-1 radius-20`} data-feather={`${this.props.icon || 'check'}`}></div>
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
