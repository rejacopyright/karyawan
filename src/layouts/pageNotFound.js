import React, {useEffect} from 'react'
export default function PageNotFound(props){
  useEffect(() => {
    document.title = '404 Not Found';
  });
  return(
    <div className="content-page">
      <div className="content">
        <div className="container-fluid">
          <div className="row vh-75 center">
            <div className="col-12 text-center">
              <img src={require('../assets/images/not-found.png')} alt="" width="250" style={{ filter: 'opacity(.25)' }} />
              <div className="d-block text-muted mb-3"><i className="uil uil-exclamation-circle mr-2" />Mohon Maaf, Halaman yang anda cari tidak ditemukan <br/> atau masih dalam perbaikan ... !</div>
              <button type="button" className="btn btn-sm btn-light pl-1" onClick={() => props.history.goBack()}><i className="uil uil-arrow-left"/>BACK</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
