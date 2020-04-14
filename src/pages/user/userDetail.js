import React, {Component} from 'react';
import axios from 'axios';
import con from '../../con/api';
import fire from '../../con/fire';
import Avatar from '../../assets/images/users/avatar.png';
import { ClassicSpinner } from "react-spinners-kit";
class Dashboard extends Component {
  _isMounted = false;
  state = {
    user:[],
    avatar:null,
    loading:true
  }
  componentDidMount() {
    this._isMounted = true;
    const userId = this.props.match.params.userId;
    fire.on('value', () => {
      this._isMounted && axios.get(con.api+'/user/detail/'+userId, {headers:con.headers})
      .then(res => {
        if (res.data.images.length) { this.setState({ avatar:'data:image/jpeg;base64,'+res.data.images[0].base }); }
        this.setState({ user:res.data.user, loading:false });
      }).then(() => (document.title = this.state.user.name));
    });
  }
  render() {
    return (
      <div className="content-page">
        <div className="content">
          <div className="container-fluid">
            <div className="row pt-3">
              <div className="col-lg-3">
                <div className="card">
                  <div className="position-absolute same-25 center m-1 bg-light radius-5 pointer" onClick={() => this.props.history.goBack()}><i className="uil uil-arrow-left text-12" /></div>
                  <div className="card-body">
                    <div className="text-center mt-3">
                      <div className="same-100 mx-auto radius-100 border border-1 p-1 d-flex align-items-center justify-content-center oh">
                        <img src={this.state.avatar || Avatar} alt="avatar" className="h-100" />
                      </div>
                      <h5 className="mt-2 mb-0 text-capitalize"> {this.state.user.name} </h5>
                      <h6 className="text-primary mt-2 mb-0"><small className="uil uil-user mr-2" />{this.state.user.username}</h6>
                      <p className="text-muted mt-2 mb-3">{this.state.user.email}</p>
                      <button type="button" className="btn btn-soft-primary btn-sm mr-1">Follow</button>
                      <button type="button" className="btn btn-white btn-sm">Message</button>
                    </div>
                    <div className="mt-3 border-top">
                      <h6>Address</h6>
                      <p className="text-muted mb-2 text-capitalize">{this.state.user.alamat}</p>
                    </div>
                    <div className="mt-2 pt-2 border-top">
                      <h4 className="mb-3 font-size-15">Skills</h4>
                      <label className="badge badge-soft-primary mr-2"> UI design </label>
                      <label className="badge badge-soft-primary mr-2">UX</label>
                      <label className="badge badge-soft-primary mr-2">Sketch</label>
                      <label className="badge badge-soft-primary mr-2">Photoshop</label>
                      <label className="badge badge-soft-primary">Frontend</label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-9">
                <div className="card">
                  <div className="card-body">
                    <ul className="nav nav-pills navtab-bg bg-white nav-justified shadow-sm" id="pills-tab" role="tablist">
                      <li className="nav-item"> <a className="nav-link py-1 active" data-toggle="pill" href="#pills-activity" role="tab" aria-selected="true"> Activity </a> </li>
                      <li className="nav-item"> <a className="nav-link py-1" data-toggle="pill" href="#pills-pics" role="tab" aria-selected="false"> Pictures </a> </li>
                      <li className="nav-item"> <a className="nav-link py-1" data-toggle="pill" href="#pills-projects" role="tab" aria-selected="false"> Projects </a> </li>
                      <li className="nav-item"> <a className="nav-link py-1" data-toggle="pill" href="#pills-files" role="tab" aria-selected="false"> Files </a> </li>
                    </ul>
                    <div className="tab-content" id="pills-tabContent">
                      <div className="tab-pane fade show active" id="pills-activity" role="tabpanel">
                        <h5 className="mt-4"> Last Month </h5>
                        <div className="left-timeline mt-3 pl-4">
                          <ul className="list-unstyled events mb-0">
                            <li className="event-list">
                              <div className="pb-4">
                                <div className="media">
                                  <div className="event-date width-xs mr-4 lh-2">
                                    <div className="badge badge-soft-primary"> 21 hours ago </div>
                                  </div>
                                  <div className="media-body">
                                    <h6 className="font-size-15 mt-0 mb-1"> UX and UI for Ubold Admin </h6>
                                    <p className="text-muted font-size-14"> Ubold Admin - A responsive admin and dashboard template </p>
                                  </div>
                                </div>
                              </div>
                            </li>
                            <li className="event-list">
                              <div className="pb-4">
                                <div className="media">
                                  <div className="event-date width-xs mr-4 lh-2">
                                    <div className="badge badge-soft-primary"> 4 days ago </div>
                                  </div>
                                  <div className="media-body">
                                    <h6 className="font-size-15 mt-0 mb-1"> UX and UI for Hyper Admin </h6>
                                    <p className="text-muted font-size-14"> Hyper Admin - A responsive admin and dashboard template </p>
                                  </div>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="tab-pane fade" id="pills-pics" role="tabpanel">
                        <div className="row">
                          {
                            (this.state.user.img !== undefined) && this.state.user.img.map((r, key) => (
                              <div className="col-md-auto text-center mb-3" key={key}>
                                <div className="same-200 mx-auto oh p-2 position-relative d-flex align-items-center justify-content-center border border-gray border-1 border-dashed radius-20">
                                  <img className="w-100 img-avatar radius-5" src={`data:image/jpeg;base64,${r.base}`} alt="" />
                                </div>
                              </div>
                            ))
                          }
                        </div>
                      </div>
                      <div className="tab-pane fade" id="pills-projects" role="tabpanel">
                        <h5 className="mt-3">Projects</h5>
                        <div className="row mt-3">
                          <div className="col-xl-4 col-lg-6">
                            <div className="card border">
                              <div className="card-body pb-1">
                                <div className="badge badge-soft-primary float-right"><i className="uil uil-calender mr-1" /> 15 Dec</div>
                                <p className="text-success text-uppercase font-size-12 mb-2"> Web Design </p>
                                <h5> <span className="text-dark"> Landing page Design </span> </h5>
                                <p className="text-muted mb-2">If several languages coalesce, the grammar of the resulting language is more regular. </p>
                                <div>
                                  <span> <img src={Avatar} alt="avatar" className="avatar-sm m-1 rounded-circle" /> </span>
                                  <span> <img src={Avatar} alt="avatar" className="avatar-sm m-1 rounded-circle" /> </span>
                                  <span> <div className="avatar-sm font-weight-bold d-inline-block m-1"> <span className="avatar-title rounded-circle bg-soft-warning text-warning"> 2+ </span> </div> </span>
                                </div>
                              </div>
                              <div className="card-body border-top pt-2">
                                <div>
                                  <div className="badge badge-success">Completed</div>
                                  <div className="pt-2">
                                    <div className="progress" style={{height: 5}}>
                                      <div className="progress-bar bg-success w-50" role="progressbar" aria-valuenow={100} aria-valuemin={0} aria-valuemax={100} />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="tab-pane fade" id="pills-files" role="tabpanel">
                        <h5 className="mt-3">Files</h5>
                        <div className="card mb-2 shadow-none border">
                          <div className="p-1 px-2">
                            <div className="row align-items-center">
                              <div className="col-auto"> <img src={require("../../assets/images/projects/project-1.jpg")} className="avatar-sm rounded" alt="files" /> </div>
                              <div className="col pl-0"> <span className="text-muted font-weight-bold">sales-assets.zip</span> <p className="mb-0"> 2.3 MB </p> </div>
                              <div className="col-auto">
                                <button className="btn btn-link text-muted btn-lg p-0"> <i className="uil uil-cloud-download font-size-14" /> </button>
                                <button className="btn btn-link text-danger btn-lg p-0"> <i className="uil uil-multiply font-size-14" /> </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="card mb-2 shadow-none border">
                          <div className="p-1 px-2">
                            <div className="row align-items-center">
                              <div className="col-auto"> <img src={require("../../assets/images/projects/project-2.jpg")} className="avatar-sm rounded" alt="files" /> </div>
                              <div className="col pl-0"> <span className="text-muted font-weight-bold">new-contarcts.docx</span> <p className="mb-0"> 1.25 MB </p> </div>
                              <div className="col-auto">
                                <button className="btn btn-link text-muted btn-lg p-0"> <i className="uil uil-cloud-download font-size-14" /> </button>
                                <button className="btn btn-link text-danger btn-lg p-0"> <i className="uil uil-multiply font-size-14" /> </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            { this.state.loading && <div className="overlay center"><ClassicSpinner color="#5369f8" loading={true} /></div> }
          </div>
        </div>
      </div>
    );
  }
}
export default Dashboard;
