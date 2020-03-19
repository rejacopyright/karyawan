import React from 'react';
import Chart from 'react-apexcharts';
import moment from 'moment';
import 'moment/locale/id';

class Dashboard extends React.Component {
  _isMounted = false;
  state = {
    series: [
      {
        name: 'Male',
        data: [31, 40, 28, 51, 42]
      },
      {
        name: 'Female',
        data: [80, 32, 45, 90, 34]
      }
    ],
    options: {
      chart: {
        toolbar: { show: false },
      },
      colors: ["#ff80ab", "#82b1ff"],
      dataLabels: { enabled: false },
      stroke: { curve: 'smooth' },
      title: { text: 'People Analytic', align: 'left' },
      subtitle: { text: '5 Jam Terakhir ('+moment().format("dddd, DD MMMM YYYY")+')', align: 'left' },
      xaxis: {
        type: 'date',
        categories: [moment().subtract(4, 'hours').format('HH:mm:ss'), moment().subtract(3, 'hours').format('HH:mm:ss'), moment().subtract(2, 'hours').format('HH:mm:ss'), moment().subtract(1, 'hours').format('HH:mm:ss'), moment().format('HH:mm:ss')]
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
    this.setState({
      series: [
        {
          name: 'Male',
          data: [this.randInt(20,100), this.randInt(20,100), this.randInt(20,100), this.randInt(20,100), this.randInt(20,100)]
        },
        {
          name: 'Female',
          data: [this.randInt(20,100), this.randInt(20,100), this.randInt(20,100), this.randInt(20,100), this.randInt(20,100)]
        }
      ],
      options:{
        ...this.state.options,
        xaxis:{
          type: 'datetime',
          categories: [moment().subtract(4, 'hours').format('HH:mm:ss'), moment().subtract(3, 'hours').format('HH:mm:ss'), moment().subtract(2, 'hours').format('HH:mm:ss'), moment().subtract(1, 'hours').format('HH:mm:ss'), moment().format('HH:mm:ss')]
        }
      }
    });
  }
  componentDidMount() {
    document.title = 'Dashboard';
    this.timerID = setInterval( () => this.realtime(), 1000 );
  }
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  render() {
    return (
      <div className="content-page">
        <div className="content">
          <div className="container-fluid">
            <div className="row mt-3">
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <Chart options={this.state.options} type="area" series={this.state.series} height={350} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
