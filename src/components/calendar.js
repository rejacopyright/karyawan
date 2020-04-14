import React from 'react';
import moment from 'moment'
import 'moment/locale/id'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"
import '@fullcalendar/core/main.css'
import '@fullcalendar/daygrid/main.css'
import '../assets/scss/calendar.scss'

class Calendar extends React.Component {
  handleDateClick(e){
    console.log(e);
  }
  handleEvent(e){
    console.log(e.event.start, e.event.end);
  }
  render() {
    return (
      <FullCalendar
        themeSystem='bootstrap'
        defaultView="dayGridMonth"
        plugins={[ dayGridPlugin, interactionPlugin ]}
        snapDuration="00:025"
        ref={i => this.calendarRef = i}
        editable
        eventResizableFromStart
        selectable
        locale='id'
        select={e => {
          console.log(e);
        }}
        fixedWeekCount={false}
        firstDay={0}
        columnHeaderFormat={{weekday:'long'}}
        eventLimit={3}
        eventLimitText='laen'
        eventDrop={this.handleEvent.bind(this)}
        eventResize={this.handleEvent.bind(this)}
        dateClick={this.handleDateClick.bind(this)}
        // hiddenDays={[0,6]}
        events={[
          { title: 'BOLOS', start: moment().subtract(2, 'days').format('YYYY-MM-DD'), end: moment().subtract(0, 'days').format('YYYY-MM-DD'), color: '#cd3838' },
          { title: 'Sakit', start: moment().subtract(4, 'days').format('YYYY-MM-DD'), color: '#eb9515' },
          { title: 'Ijin', start: moment().subtract(5, 'days').format('YYYY-MM-DD'), color: '#eb15bc' },
          { title: 'Cuti', start: moment().add(5, 'days').format('YYYY-MM-DD'), end: moment().add(9, 'days').format('YYYY-MM-DD'), color: '#e6dd14' },
        ]}
        eventRender={e => {
          console.log(e.el);
        }}
      />
    );
  }
}
export default Calendar
