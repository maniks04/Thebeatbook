import React from 'react';
import $ from 'jquery';
const moment = require('moment');
import 'fullcalendar';
import axios from 'axios';
import { Modal, Button, Form, Input } from 'antd';

const Calendar = (data) => {
  $(function() {
    $('#calendar').fullCalendar({
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      },

      footer: { /* can add if wanted */},
      droppable: true,
      editable: true,
      selectable: true,
      selectHelper: true,
      unselectAuto: false,
      nowIndicator: true,
      height: window.innerHeight*.87,

      select: function(start, end, allDay) {

        Modal.confirm({
          title: 'Event Info',
          content: (
            <div>
              <Form layout={'horizontal'}>
                <Form.Item  label='Event Title' required='true'>
                    <Input className="title" placeholder='Super Awsome Event'/>
                </Form.Item>
                <Form.Item label='Event Description'>
                  <Input className="description" placeholder='Super Awsome Event Description'/>
                </Form.Item>
              </Form>
            </div>
          ),
          onOk(){
            let title = $('.title').val();
            let description = $('.description').val();
            if (title) {
              $('#calendar').fullCalendar('renderEvent',
                  {
                      title: title,
                      start: start,
                      end: end,
                      description: description,
                      allDay: false
                  },
                  true
              );
              axios.post('/calendar', {
                title: title,
                description: description,
                start: start,
                end: end
              }).then(res => {
              }).catch(err => {
                console.log(err)
              })
            } else {
              alert('You need a title')
            }
          },
          onCancel(){

          }
        })
        $('#calendar').fullCalendar('unselect');
      },

      eventDrop: function(event, delta, revertFunc) {
        let eventId = event.id
        let timeChange = delta._data

        axios.post('/dragAndDrop', {
          eventId: eventId,
          timeChange: timeChange
        })
          .then(res => {

          })
          .catch(err => {
            console.log(err)
          })
      },

      events: function(start, end, timezone, callback) {
          var events = []
          data.forEach((event) => {
            events.push({
              //title: event.booking_title,
              description: event.booking_description,
              start: event.start_time,
              end: event.end_time,
              id: event.booking_id
            })
          })
          callback(events)
      },

      minTime: '04:00:00', // when the calendar starts the day.
      // maxTime: '22:00:00', // when the calender ends the day.

      eventClick: function ( event, jsEvent, view ) {
         Modal.info({
           title: 'Event Description',
           content: (
             <div>{event.description}</div>
           ),
           onOk(){},
           onCancel(){}
         })
      }
    });
  });


return (
    <div>
      <div id='calendar'></div>
    </div>
  )
}

export default Calendar
