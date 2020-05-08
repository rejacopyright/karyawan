import React from 'react'
import Chart from 'react-apexcharts'
import axios from 'axios'
import con from '../../con/api'
import moment from 'moment'
import 'moment/locale/id'

class Grafik extends React.Component {
  _isMounted = false;
  timeMin = (sub) => {
    return moment().subtract(sub || 0, 'hours').format('HH:mm:ss');
  }
  state = {
    series: [
      { name: 'Absen', data: [0, 0, 0, 0, 0] },
      { name: 'Hadir', data: [0, 0, 0, 0, 0] },
      { name: 'Terdeteksi Kamera', data: [0, 0, 0, 0, 0] }
    ],
    options: {
      chart: {
        toolbar: { show: false },
      },
      colors: ["#ff80ab", "#82b1ff", "#ffbe0b"],
      dataLabels: { enabled: false },
      stroke: { curve: 'smooth' },
      title: { text: 'People Analytic', align: 'left' },
      subtitle: { text: '5 Jam Terakhir ('+moment().format("dddd, DD MMMM YYYY")+')', align: 'left' },
      xaxis: {
        type: 'date',
        categories: [this.timeMin(4), this.timeMin(3), this.timeMin(2), this.timeMin(1), this.timeMin()]
      },
      tooltip: {
        x: { format: 'HH:mm:ss' },
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.9,
          opacityTo: 0.7,
          stops: [0, 90, 100]
        }
      },
    },
  }
  randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }
  realtime(){
    axios.get(con.api+'/grafik', {headers:con.headers}).then(res => {
      this.setState({
        series: [ res.data.series.hadir, res.data.series.absen, res.data.series.detected ],
        options:{
          ...this.state.options,
          xaxis:{
            type: 'datetime',
            categories: [this.timeMin(4), this.timeMin(3), this.timeMin(2), this.timeMin(1), this.timeMin()]
          }
        }
      });
    });
  }
  componentDidMount() {
    this.timerID = setInterval( () => this.realtime(), 1000 );
  }
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  render () {
    return (
      <div className={`row ${this.props.rowClass}`}>
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <Chart options={this.state.options} type="area" series={this.state.series} height={350} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Grafik;
