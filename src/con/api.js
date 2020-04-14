// const user = JSON.parse(localStorage.admin || '{}');
export default {
  api: process.env.REACT_APP_API,
  img: process.env.REACT_APP_IMG,
  // user:user,
  token:'sugihart',
  headers:{Authorization:'Bearer sugihart', Accept: 'application/json'}
}
