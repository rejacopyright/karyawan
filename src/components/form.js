import React from 'react'
import Number from 'react-number-format'
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
      <textarea type="text" name={props.name} defaultValue={props.defaultValue} className={`form-control ${props.className} ${props.sm && 'text-9'}`} placeholder={props.placeholder} onChange={props.onChange} rows={props.rows} spellCheck={false} autoFocus={props.autoFocus} />
    </div>
  )
}

// Radio
export const Radio = (props) => {
  return (
    <div className="custom-control custom-radio d-inline mr-2">
      <input type="radio" id={props.id} name={props.name} value={props.value} className="custom-control-input" defaultChecked={props.checked || false} />
      <label style={props.small && { lineHeight: 2.2 }} className={`custom-control-label ${props.small && 'small f-600'} ${props.labelClass}`} htmlFor={props.id}>{props.label}</label>
    </div>
  )
}

// Checkbox
export const Checkbox = (props) => {
  return (
    <div className={`custom-control custom-checkbox ${props.rowClass}`}>
      <input type="checkbox" id={props.id} name={props.name} value={props.value} defaultChecked={props.checked || false} className="custom-control-input" onChange={props.onChange} />
      <label style={props.small && { lineHeight: 2.2 }} className={`custom-control-label ${props.small && 'small f-600'} ${props.labelClass}`} htmlFor={props.id}> {props.label} </label>
    </div>
  )
}

// Desimal
export class Desimal extends React.Component {
  state = {
    value: this.props.min && this.props.min >= this.props.value ? this.props.min : this.props.max && this.props.max <= this.props.value ? this.props.max : this.props.value,
    error:this.props.value ? '' : this.props.error
  }
  componentDidMount(){
    const props = this.props;
    let value = parseFloat(props.value || 0);
    if (parseFloat(props.min) && parseFloat(props.min) >= value) {
      value = parseFloat(props.min);
    }else if (parseFloat(props.max) && parseFloat(props.max) <= value) {
      value = parseFloat(props.max);
    }else {
      value = parseFloat(props.value);
    }
    this.setState({value: value});
  }
  UNSAFE_componentWillReceiveProps(props){
    // this.setState({value: this.props.min && this.props.min >= this.props.value ? this.props.min : this.props.max && this.props.max <= this.props.value ? this.props.max : this.props.value});
    // console.log(props.min && props.min >= props.value ? props.min : props.max && props.max <= props.value ? props.max : props.value);
    let value = parseFloat(props.value || 0);
    if (parseFloat(props.min) && parseFloat(props.min) >= value) {
      value = parseFloat(props.min);
    }else if (parseFloat(props.max) && parseFloat(props.max) <= value) {
      value = parseFloat(props.max);
    }else {
      value = parseFloat(props.value);
    }
    this.setState({value: value});
  }
  value(e){
    this.props.onChange && this.props.onChange(e.floatValue || 0);
  }
  render() {
    return (
      <div className={this.props.rowClass}>
        {
          this.props.label ?
          <label htmlFor={this.props.name}>{this.props.label}</label>
          :
          this.props.title &&
          <small className="d-block text-nowrap">{this.props.title}</small>
        }
        <div className="position-absolute r-1 bg-white radius-20 px-1 text-danger bold f-8 m-0" style={{top:'8px'}}>{ this.state.error }</div>
        <div className={`input-group ${this.props.sm && 'input-group-sm'}`}>
          {
            this.props.icon && !this.props.right &&
            <div className="input-group-prepend input-group-text border-0" style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}>
              {this.props.icon}
            </div>
          }
          <Number
            name={this.props.name}
            thousandSeparator="."
            decimalSeparator=","
            decimalScale="2"
            isAllowed={ val => {
              const {floatValue} = val;
              if (this.props.min && this.props.max) {
                return floatValue >= this.props.min && floatValue <= this.props.max;
              }
              if (this.props.min) {
                return floatValue >= this.props.min;
              }
              if (this.props.max) {
                return floatValue <= this.props.max;
              }
              return true;
            }}
            onValueChange={this.value.bind(this)}
            value={parseFloat(this.state.value)}
            defaultValue={parseFloat(this.state.value)}
            className={`form-control ${this.props.sm && 'form-control-sm'} border`}
            readOnly={this.props.readOnly}
            placeholder={this.props.placeholder}
            autoFocus={this.props.autoFocus} />
          {/* <input type="text" name={this.props.name} onChange={this.value.bind(this)} value={this.state.value} autoComplete="off" readOnly={this.props.readOnly} className={`form-control ${this.props.sm && 'form-control-sm'} border`} placeholder={this.props.placeholder} autoFocus={this.props.autoFocus} /> */}
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
