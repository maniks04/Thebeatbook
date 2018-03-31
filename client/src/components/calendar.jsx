import React from 'react';
import $ from 'jquery';
import 'fullcalendar';
import { Modal, Form, Input, TimePicker, message } from 'antd';
import axios from 'axios';
const moment = require('moment')/* eslint-disable-line */; // check back in a couple days

const Calendar = (bookings, editable, artistId, venueId, saveToStore, venueName) => {
  $(function () { /* eslint-disable-line */
    $('#calendar').fullCalendar({
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay',
      },

      droppable: true,
      selectable: true,
      selectHelper: true,
      unselectAuto: false,
      nowIndicator: true,
      height: window.innerHeight * 0.87,

      select(start, end) {
        if (editable) {

          let momentStart;
          let momentEnd;
          let setStart = (value) => {momentStart = value};
          let setEnd = (value) => {momentEnd = value};
          Modal.confirm({
            title: 'Event Info',
            content: (
              <div>
                <Form layout="horizontal">
                  <Form.Item label="Event Title" required="true">
                    <Input className="title" placeholder="Name Your Proposed Event Here" />
                  </Form.Item>
                  <Form.Item label="Event Description">
                    <Input className="description" placeholder="Give some details about the event here..." />
                  </Form.Item>
                  <Form.Item label="Start Time">
                    <TimePicker className="start" defaultValue={moment(start, "HH:mm")} format="HH:mm" minuteStep={15} onChange={value=>setStart(value)} />
                  </Form.Item>
                  <Form.Item label="End Time">
                    <TimePicker className="end" defaultValue={moment(end, "HH:mm")} format="HH:mm" minuteStep={15} onChange={value=>setEnd(value)} />
                  </Form.Item>
                </Form>
              </div>
            ),
            onOk() {
              message.success('Your booking request has been sent!');
              console.log('local format', momentStart.local().format());
              console.log('UTC format', momentStart.utc().format());
              const title = $('.title').val();
              const description = $('.description').val();
              const startTime = momentStart.local().format();//<<<<<use this old format query: 'YYYY-MM-DD h:mm:ss'
              const endTime = momentEnd.local().format();
              if (title) {
                $('#calendar').fullCalendar(
                  'renderEvent',
                  {
                    title,
                    startTime,
                    endTime,
                    description,
                    allDay: false,
                  },
                  true, // sticks to page so it doenst fall off when changing calendar vies month week etc...
                );
                const newLocalBooking = {
                  booking_title: title,
                  booking_description: description,
                  start_time: startTime,
                  end_time: endTime,
                  artistId,
                  venueId,
                  venue_name: venueName,
                  confirmed: 0,
                };
                const newUTCBooking = Object.assign({}, newLocalBooking, { /* eslint-disable-line */
                  start_time: momentStart.utc().format(),
                  end_time: momentEnd.utc().format(),
                });
                saveToStore(newLocalBooking);
                console.log('new local booking object', newLocalBooking);
                console.log('new utc booking object', newUTCBooking);
                axios.post('/calendar', newUTCBooking).then(() => {
                }).catch((err) => {
                  console.error(err) /* eslint-disable-line */
                });
              } else {
                alert('You need a title') /* eslint-disable-line */
              }
            },
            onCancel() {},
          });
        }
        $('#calendar').fullCalendar('unselect');
      },

      events(start, end, timezone, callback) {
        const events = [];
        bookings.forEach((event) => {
          const startLocal = moment.utc(event.start_time).local().format();
          const endLocal = moment.utc(event.end_time).local().format();
          //use moment to convert to local time
          events.push({
            title: event.booking_title,
            description: event.booking_description,
            start: startLocal,
            end: endLocal,
            id: event.booking_id,
          });
        });
        callback(events);
      },

      minTime: '10:00:00',
      maxTime: '26:00:00',

      eventClick(event) {
        Modal.info({
          title: event.title,
          content: (
            <div>{event.description}</div>
          ),
          onOk() {},
          onCancel() {},
        });
      },
    });
  });

  return (
    <div>
      <div id="calendar" />
    </div>
  );
};

export default Calendar;
