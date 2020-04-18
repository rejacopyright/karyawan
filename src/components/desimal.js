import React from 'react';
class Desimal extends React.Component {
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
    this.setState({
      value: val.split('.').join('').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'),
      originalValue: parseInt(val)
    });
  }
  render() {
    return (
      <div className={this.props.rowClass}>
        <small className="text-nowrap">{this.props.title}</small>
        <div className="position-absolute r-1 bg-white radius-20 px-1 text-danger bold f-8 m-0" style={{top:'8px'}}>{ this.state.error }</div>
        <div className="input-group">
          {
            this.props.icon &&
            <div className="input-group-prepend input-group-text border-0" style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}>
              {this.props.icon}
            </div>
          }
          <input type="text" name={this.props.name} onChange={this.value.bind(this)} value={this.state.value} autoComplete="off" readOnly={this.props.readOnly} className="form-control border" placeholder={this.props.placeholder} />
        </div>
        <sup className="text-success f-8">{this.props.note}</sup>
      </div>
    );
  }
}
export default Desimal
