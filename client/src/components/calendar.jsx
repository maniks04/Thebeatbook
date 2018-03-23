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

      droppable: true,
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
          onCancel(){}
        })
        $('#calendar').fullCalendar('unselect');
      },

      events: function(start, end, timezone, callback) {
          // ideas on how to show only
          var events = []
          data.forEach((event) => {
            events.push({
              title: event.booking_title,
              description: event.booking_description,
              start: event.start_time,
              end: event.end_time,
              id: event.booking_id
            })
          })
          callback(events)
      },

      minTime: '04:00:00',
      // maxTime: '22:00:00',

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
