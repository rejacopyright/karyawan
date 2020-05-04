import React, {Component} from 'react'
// import PropTypes from 'prop-types'
import axios from 'axios'
import con from '../con/api'
import ReactSelect, {components} from 'react-select'
import Skeleton from 'react-skeleton-loader'

// -------------------------- Option --------------------------
// ----- Jika Menggunakan Data Statis -----

// <Select
//   data={ [{value: 'white', label: 'White'}, {value: 'black', label: 'Black'}] } // Wajib di isi, bentuk data Array Object
//   onChange={this.onChange.bind(this)}
//   defaultValue="black" // Opsional
// />


// ----- Jika Menggunakan Data Rest -----

// <Select
//   url="url" // Wajib di isi (API Endpoint)
//   param="users" // Nama parameter dari object (jangan dipakai jika respon langsung data yang dibutuhkan)
//   value="unique_id" // Wajib di isi (parameter unik dari objek / kolom tabel pada database)
//   label="name" // Wajib di isi (parameter dari objek / kolom tabel pada database yang akan ditampilkan di field seleksi)
//   onChange={this.onChange.bind(this)}
//   defaultValue="http://domain.com/api/user/123" // Opsional (** Untuk tipe rest, defaultValue adalah API endpoint)
// />

// ----- Global Optional Params -----
// rowClass="col"
// placeholder="Your placeholder"
// noOptionsMessage="Tidak ada data yang ditemukan"
// multiple={boolean} // Default false

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? 'black' : '#777',
    backgroundColor: state.isSelected ? '#fafafa' : 'unset',
    '&:hover':{
      backgroundColor: '#fafafa',
      color: 'black',
    },
    padding: '3px 10px',
    fontSize: '9pt',
    border: 'unset',
  }),
  control: (provided, state) => ({
    ...provided,
    '&:hover, &:focus':{
      borderColor: '#eee',
      backgroundColor: '#fff',
    },
    borderRadius: 5,
    borderColor: '#f5f5f5',
    padding: 0,
    minHeight: 10,
    boxShadow: 'unset',
    backgroundColor: '#f5f5f5',
  }),
  noOptionsMessage: (provided, state) => ({
    ...provided,
    fontSize: '9pt',
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    padding: '0 0 0 10px',
    fontSize: '9pt',
  }),
  menuList: (provided, state) => ({
    ...provided,
    height: '200px',
  }),
  menu: (provided, state) => ({
    ...provided,
    borderRadius: 5,
    boxShadow: '0 1px hsla(0,0%,0%,0.1), 0 1px 5px hsla(0,0%,0%,0.1)',
  }),
  indicatorSeparator: (provided, state) => ({
    ...provided,
    display: 'none'
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    padding: 5,
  }),
  multiValueRemove: (provided, state) => ({
    ...provided,
    '&:hover, &:focus':{
      opacity: 1,
      color: 'inherit',
      backgroundColor: 'inherit',
    },
    opacity: .25,
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';
    return { ...provided, opacity, transition };
  },
}
const DropdownIndicator = ( props: ElementConfig<typeof components.DropdownIndicator> ) => {
  return (
    <components.DropdownIndicator {...props}>
      <i className='uil uil-angle-down' />
    </components.DropdownIndicator>
  )
}
const ClearIndicator = ( props: ElementConfig<typeof components.ClearIndicator> ) => {
  return (
    <components.DropdownIndicator {...props}>
      <i className='uil uil-times' />
    </components.DropdownIndicator>
  )
}
const MultiValueRemove = ( props: ElementConfig<typeof components.MultiValueRemove> ) => {
  return (
    <components.MultiValueRemove {...props}>
      <i className='uil uil-times' />
    </components.MultiValueRemove>
  )
}
class Select extends Component {
  state = {
    data:[],
    isLoading:false,
    page:1,
    query:'',
    defaultValue: null
  }
  dataset(){
    this.props.data ? this.setState({data:this.props.data, isLoading:false}) :
    axios.get(this.props.url, {headers:con.headers, params:{page:this.state.page, q:this.state.query}}).then(res => {
      const data = this.props.param ? res.data[this.props.param] : res.data;
      const r = data.map(i => {
        const rj = {};
        rj['value'] = i[this.props.value];
        rj['label'] = i[this.props.label];
        return rj;
      });
      this.setState({data:(r.length ? r : [{}]), isLoading:false});
    });
  }
  onInputChange(e){
    this.setState({query: e, page:1, isLoading:true}, () => this.dataset());
  }
  scrollTo(pos){
    let page = this.state.page;
    if (pos === 'bottom') {
      this.setState({isLoading:true});
      axios.get(this.props.url, {headers:con.headers, params:{page:++page, q:this.state.query}}).then(res => {
        if ((this.props.param ? res.data[this.props.param] : res.data).length) {
          const r = (this.props.param ? res.data[this.props.param] : res.data).map(i => {
            const rj = {};
            rj['value'] = i[this.props.value];
            rj['label'] = i[this.props.label];
            return rj;
          });
          this.setState({data: this.state.data.concat(r), page:res.config.params.page});
        }
      }).then(() => this.setState({isLoading:false}));
    }
  }
  componentDidMount(){
    (this.props.defaultValue && this.props.data) ?
    /*eslint-disable*/
    this.setState({defaultValue: this.props.data.find(i => i.value == this.props.defaultValue)}) :
    this.props.defaultValue && axios.get(this.props.defaultValue, {headers:con.headers}).then(res => {
      if (res.data[this.props.param]) {
        const rj = {};
        rj['value'] = res.data[this.props.param][this.props.value];
        rj['label'] = res.data[this.props.param][this.props.label];
        this.setState({defaultValue: rj});
      }
    });
    this.dataset();
  }
  render(){
    return(
      <div className={this.props.rowClass}>
        {this.props.bold && this.props.title ? <label>{this.props.title}</label> : this.props.title && <small className="d-block">{this.props.title}</small>}
        {
          !this.state.data.length ?
          <Skeleton width="100%" height="35px" count={1} widthRandomness={0} color="#f5f5f5" borderRadius="5px" />
          :
          <ReactSelect
            defaultValue={
              this.props.defaultValue && this.state.defaultValue
            }
            styles={customStyles}
            components={{ DropdownIndicator, ClearIndicator, MultiValueRemove }}
            name={this.props.name}
            placeholder={this.props.placeholder}
            noOptionsMessage={(e) => e.inputValue = this.props.noOptionsMessage || 'No Data...'}
            cacheOptions
            isLoading={this.state.isLoading}
            isMulti={this.props.multiple}
            isClearable={this.props.isClearable}
            inputValue={this.state.query}
            options={this.props.data || this.state.data}
            onInputChange={this.onInputChange.bind(this)}
            onChange={e => this.props.onChange(e)}
            onMenuScrollToTop={!this.props.data && this.scrollTo.bind(this, 'top')}
            onMenuScrollToBottom={!this.props.data && this.scrollTo.bind(this, 'bottom')}
          />
        }
      </div>
    )
  }
}

// Props Validation
// Select.propTypes = {
//   url: PropTypes.any.isRequired,
//   value: PropTypes.any.isRequired,
//   label: PropTypes.any.isRequired,
// }

export default Select
