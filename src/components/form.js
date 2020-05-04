import React from 'react'
import PropTypes from 'prop-types'

// Input
export const Input = (props) => {
  return (
    <div className={props.rowClass}>
      {
        props.label ?
        <label htmlFor={props.name}>{props.label}</label>
        :
        props.title &&
        <small className="d-block">{props.title}</small>
      }
      <input type={props.password ? 'password' : 'text'} name={props.name} defaultValue={props.defaultValue} className={`form-control ${props.sm && 'form-control-sm'} ${props.className}`} placeholder={props.placeholder} onChange={props.onChange} spellCheck={false} autoFocus={props.autoFocus} />
    </div>
  )
}

// Textarea
export const Textarea = (props) => {
  return (
    <div className={props.rowClass}>
      {
        props.label ?
        <label htmlFor={props.name}>{props.label}</label>
        :
        props.title &&
        <small className="d-block">{props.title}</small>
      }
      <textarea type="text" name={props.name} defaultValue={props.defaultValue} className={`form-control ${props.className}`} placeholder={props.placeholder} onChange={props.onChange} rows={props.rows} spellCheck={false} autoFocus={props.autoFocus} />
    </div>
  )
}

// Radio
export const Radio = (props) => {
  return (
    <div className="custom-control custom-radio d-inline mr-2">
      <input type="radio" id={props.id} name={props.name} value={props.value} className="custom-control-input" defaultChecked={props.checked || false} />
      <label className="custom-control-label" htmlFor={props.id}>{props.label}</label>
    </div>
  )
}

// Checkbox
export const Checkbox = (props) => {
  return (
    <div className={`custom-control custom-checkbox ${props.rowClass}`}>
      <input type="checkbox" id={props.id} name={props.name} value={props.value} defaultChecked={props.checked || false} className="custom-control-input" onChange={props.onChange} />
      {
        props.title ?
        <label className={`custom-control-label text-9 f-400 lh-2 ${props.labelClass}`} htmlFor={props.id}> {props.title} </label>
        : props.label ?
        <label className={`custom-control-label ${props.labelClass}`} htmlFor={props.id}> {props.label} </label>
        : <label className="custom-control-label" htmlFor={props.id}> Checkbox </label>
      }
    </div>
  )
}

// Desimal
export class Desimal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value:(this.props.value || 0).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'),
      originalValue:  this.props.value || 0,
      error:this.props.value ? '' : this.props.error
    }
  }
  UNSAFE_componentWillReceiveProps(props) {
    if (props.value) {
      this.setState({ value: props.value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') });
    }
  }
  value = (e) => {
    !e.target.value ? this.setState({ error:this.props.error }) : this.setState({ error:'' });
    let val = e.target.value.replace(/[^0-9]+/g, "");
    if (val.length > 1 && val.split('')[0] === '0') {
      val = val.substr(1);
    }
    if (this.props.max && parseInt(this.props.max) < parseInt(val)) {
      // console.log('not coooool');
    }else {
      this.setState({
        value: val.split('.').join('').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'),
        originalValue: parseInt(val)
      });
    }
  }
  render() {
    return (
      <div className={this.props.rowClass}>
        {
          this.props.label ?
          <label htmlFor={this.props.name}>{this.props.label}</label>
          :
          this.props.title &&
          <small className="text-nowrap">{this.props.title}</small>
        }
        <div className="position-absolute r-1 bg-white radius-20 px-1 text-danger bold f-8 m-0" style={{top:'8px'}}>{ this.state.error }</div>
        <div className={`input-group ${this.props.sm && 'input-group-sm'}`}>
          {
            this.props.icon && !this.props.right &&
            <div className="input-group-prepend input-group-text border-0" style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}>
              {this.props.icon}
            </div>
          }
          <input type="text" name={this.props.name} onChange={this.value.bind(this)} value={this.state.value} autoComplete="off" readOnly={this.props.readOnly} className={`form-control ${this.props.sm && 'form-control-sm'} border`} placeholder={this.props.placeholder} autoFocus={this.props.autoFocus} />
          {
            this.props.icon && this.props.right &&
            <div className="input-group-append input-group-text border-0" style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}>
              {this.props.icon}
            </div>
          }
        </div>
        <sup className="text-success f-8">{this.props.note}</sup>
      </div>
    );
  }
}

// PropTypes
Input.propTypes = {
  name: PropTypes.any.isRequired,
}
Radio.propTypes = {
  name: PropTypes.any.isRequired,
  id: PropTypes.any.isRequired,
  label: PropTypes.any.isRequired,
}
Checkbox.propTypes = {
  id: PropTypes.any.isRequired,
}
Textarea.propTypes = {
  name: PropTypes.any.isRequired,
}
Desimal.propTypes = {
  name: PropTypes.any.isRequired,
}
