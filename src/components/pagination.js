import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

const Generate = (n, f) => Array(n).fill().map((v, i) => (f || 1)+i);
class Pagination extends Component {
  state = {
    page: 1
  }
  static getDerivedStateFromProps(props, state){
    return {
      page: props.currentPage
    }
  }
  render(){
    if (this.props.lastPage === 1) {
      return true;
    }
    return(
      <div className={`row justify-content-${this.props.align || 'center'}`}>
        {
          ((this.props.lastPage > 10 && this.state.page >= 7) || (this.props.lastPage === 11 && this.state.page === 6)) &&
          <Fragment>
            <div className="col-auto px-1">{console.log('kondisi 1')}<button type="button" onClick={() => this.props.onClick(1)} className={`center same-25 ${this.state.page === 1 ? 'btn-secondary' : 'btn-white'} oh rounded-circle text-7 f-700`}>1</button></div>
            <div className="col-auto px-1"><button type="button" onClick={() => this.props.onClick(2)} className={`center same-25 ${this.state.page === 2 ? 'btn-secondary' : 'btn-white'} oh rounded-circle text-7 f-700`}>2</button></div>
            <div className="col-auto px-0"><span className="center same-25 oh text-7 f-700">...</span></div>
          </Fragment>
        }
        {
          (this.props.lastPage > 10 && this.state.page >= 7 && this.state.page < (this.props.lastPage - 5)) ?
          Generate(7, this.state.page - 3).map(key => (
            <div className="col-auto px-1" key={key}>{console.log('kondisi 2')}<button type="button" onClick={() => this.props.onClick(key)} className={`center same-25 ${this.state.page === key ? 'btn-secondary' : 'btn-white'} oh rounded-circle text-7 f-700`}>{key}</button></div>
          ))
          :
          (this.props.lastPage > 10 && this.state.page >= (this.props.lastPage - 5)) ?
          Generate(5, this.props.lastPage - 6).map(key => (
            <div className="col-auto px-1" key={key}>{console.log('kondisi 3')}<button type="button" onClick={() => this.props.onClick(key)} className={`center same-25 ${this.state.page === key ? 'btn-secondary' : 'btn-white'} oh rounded-circle text-7 f-700`}>{key}</button></div>
          ))
          :
          Generate(this.props.lastPage > 10 ? 7 : this.props.lastPage).map(key => (
            <div className="col-auto px-1" key={key}>{console.log('kondisi 4')}<button type="button" onClick={() => this.props.onClick(key)} className={`center same-25 ${this.state.page === key ? 'btn-secondary' : 'btn-white'} oh rounded-circle text-7 f-700`}>{key}</button></div>
          ))
        }
        {
          (this.props.lastPage > 10) && (
            <Fragment>
              {(this.state.page < (this.props.lastPage - 5)) && <div className="col-auto px-0"><span className="center same-25 oh text-7 f-700">...</span></div>}
              <div className="col-auto px-1"><button type="button" onClick={() => this.props.onClick(this.props.lastPage-1)} className={`center same-25 ${this.state.page === this.props.lastPage-1 ? 'btn-secondary' : 'btn-white'} oh rounded-circle text-7 f-700`}>{this.props.lastPage-1}</button></div>
              <div className="col-auto px-1"><button type="button" onClick={() => this.props.onClick(this.props.lastPage)} className={`center same-25 ${this.state.page === this.props.lastPage ? 'btn-secondary' : 'btn-white'} oh rounded-circle text-7 f-700`}>{this.props.lastPage}</button></div>
            </Fragment>
          )
        }
      </div>
    )
  }
}
// PropTypes
Pagination.propTypes = {
  // currentPage: PropTypes.any.isRequired,
  // lastPage: PropTypes.any.isRequired,
  onClick: PropTypes.any.isRequired,
}
export default Pagination
