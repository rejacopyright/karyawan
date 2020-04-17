import React from 'react'
import PropTypes from 'prop-types'

// Input
export const Input = (props) => {
  return (
    <div className={props.rowClass}>
      <small className="d-block">{props.title}</small>
      <input type="text" name={props.name} defaultValue={props.defaultValue} className={`form-control ${props.className}`} placeholder={props.placeholder} onChange={props.onChange} spellCheck={false} />
    </div>
  )
}

// Textarea
export const Textarea = (props) => {
  return (
    <div className={props.rowClass}>
      <small className="d-block">{props.title}</small>
      <textarea type="text" name={props.name} defaultValue={props.defaultValue} className={`form-control ${props.className}`} placeholder={props.placeholder} onChange={props.onChange} rows={props.rows} spellCheck={false} />
    </div>
  )
}

// Decimal
export const Decimal = (props) => {
  return (
    <div className={props.rowClass}>
      <small className="d-block">{props.title}</small>
      <textarea type="text" name={props.name} defaultValue={props.defaultValue} className={`form-control ${props.className}`} placeholder={props.placeholder} onChange={props.onChange} rows={props.rows} spellCheck={false} />
    </div>
  )
}

// PropTypes
Input.propTypes = {
  name: PropTypes.any.isRequired,
  title: PropTypes.any.isRequired,
}
Textarea.propTypes = {
  name: PropTypes.any.isRequired,
  title: PropTypes.any.isRequired,
}
