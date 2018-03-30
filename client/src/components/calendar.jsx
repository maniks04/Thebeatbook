import React from 'react';
import $ from 'jquery';
import 'fullcalendar';
import { Modal, Form, Input } from 'antd';
import axios from 'axios';
// const moment = require('moment')/* eslint-disable-line */; // check back in a couple days

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
          Modal.confirm({
            title: 'Event Info',
            content: (
              <div>
                <Form layout="horizontal">
                  <Form.Item label="Event Title" required="true">
                    <Input className="title" placeholder="Super Awsome Event" />
                  </Form.Item>
                  <Form.Item label="Event Description">
                    <Input className="description" placeholder="Super Awsome Event Description" />
                  </Form.Item>
                </Form>
              </div>
            ),
            onOk() {
              const title = $('.title').val();
              const description = $('.description').val();
              if (title) {
                $('#calendar').fullCalendar(
                  'renderEvent',
                  {
                    title,
                    start,
                    end,
                    description,
                    allDay: false,
                  },
                  true, // sticks to page so it doenst fall off when changing calendar vies month week etc...
                );
                const newBooking = {
                  booking_title: title,
                  booking_description: description,
                  start_time: start.format('YYYY-MM-DD h:mm:ss'),
                  end_time: end.format('YYYY-MM-DD h:mm:ss'),
                  artistId,
                  venueId,
                  venue_name: venueName,
                  confirmed: 0,
                };
                const newBooking2 = Object.assign({}, newBooking, { /* eslint-disable-line */
                  start_time: start.format('YYYY-MM-DD h:mm:ss'),
                  end_time: end.format('YYYY-MM-DD h:mm:ss'),
                });
                saveToStore(newBooking);
                axios.post('/calendar', newBooking).then(() => {
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
          events.push({
            title: event.booking_title,
            description: event.booking_description,
            start: event.start_time,
            end: event.end_time,
            id: event.booking_id,
          });
        });
        callback(events);
      },

      minTime: '6:00:00',
      maxTime: '26:00:00',

      eventClick(event) {
        Modal.info({
          title: 'Event Description',
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
