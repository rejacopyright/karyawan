import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'

class Notif extends React.Component {
  render () {
   return (
     <Snackbar
       anchorOrigin={{ vertical: 'bottom', horizontal: 'right', }}
       open={this.props.open}
       autoHideDuration={5000}
       onClose={this.props.onClose}
     >
       <div className={`bg-soft-${this.props.theme || 'primary'} text-center text-${this.props.theme || 'primary'} border border-${this.props.theme || 'primary'} radius-5 shadow py-1 px-3 f-500 mw-200`}>
         <span className={`mr-1 text-10 uil uil-exclamation-circle`}></span> {this.props.msg || ''}
       </div>
     </Snackbar>
   )
  }
}

export default Notif;
