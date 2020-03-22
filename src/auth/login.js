import React, { Component } from 'react'
import { connect } from 'react-redux'

class Login extends Component {
  render() {
    // console.log(this.props);
    return (
      <form action="" onSubmit={e => {e.preventDefault();this.props.handleLogin()}}>
        <div>
          <input type="text" name="username" onChange={i => this.props.handleUsername(i)} />
        </div>
        <div>
          <input type="text" name="password" onChange={i => this.props.handlePassword(i)} />
        </div>
        <div>
          <button type="submit">LOGIN</button>
        </div>
      </form>
    );
  }
}
const mapState = (state) => {
  return {
    username:state.username,
    password:state.password
  }
}
const mapDispatch = (dispatch) => {
  return {
    handleUsername: (e) => dispatch({type:'USERNAME', value:e.target.value}),
    handlePassword: (e) => dispatch({type:'PASSWORD', value:e.target.value}),
    handleLogin: () => dispatch({type:'LOGIN'}),
  }
}
export default connect(mapState, mapDispatch)(Login)
