import { createStore } from 'redux';
import Cookies from 'js-cookie';
import moment from 'moment';
import 'moment/locale/id';
// Init State
const init = {
  username:null,
  password:null,
  auth:false,
  user:[],
  message:null
}
// Reducer
const reducer = (state = init, action) => {
  if (action.type === 'USERNAME') {
    return {...state, username: action.value}
  }
  if (action.type === 'PASSWORD') {
    return {...state, password: action.value}
  }
  if (action.type === 'MESSAGE') {
    return {...state, message: action.value}
  }
  if (action.type === 'LOGIN') {
    let exp = moment().add(10, 'm').toDate();
    Cookies.set('user', action.value, { expires: exp });
    Cookies.set('auth', true, { expires: exp });
    return {...state, auth: true}
  }
  if (action.type === 'LOGOUT') {
    Cookies.remove('user');
    Cookies.remove('auth');
    return {state:init};
  }
  return state;
}
// Store
const store = createStore(reducer);
export default store;
