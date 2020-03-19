import React from 'react';
export default class Modal extends React.Component {
  render() {
    return (
      <div className="modal fade" id={this.props.id} role="dialog" aria-hidden="true">
        <div className={`modal-dialog modal-dialog-centered ${this.props.modalClass}`}>
          <div className="modal-content">
            {
              !(this.props.headerDisabled) &&
              <div className="modal-header py-2 bg-light">
                <h6 className="modal-title badge badge-soft-primary">{this.props.title}</h6>
                <button type="button" className="close py-3 px-2" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true"><i className="uil uil-times-circle text-danger" /></span> </button>
              </div>
            }
            <div className={`modal-body ${this.props.contentClass}`}>
              {this.props.content}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
