import React from 'react';
import $ from 'jquery';
const moment = require('moment');
import 'fullcalendar';
import axios from 'axios';


// all you need to do is import Calender in a file and then call the calendar()
//    within to have it be displayed.
const Calendar = (props) => {
  $(function() {
    $('#calendar').fullCalendar({
      // adds buttons for swaping the view and gives a title to the calendar (typically the date range of the view being showed.)
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      },

      footer: {
        // same layout as header if you want to add anything to bottom of calendar.
      },

      // these allow calender elements to be moveable droppable not sticky and shows exactly what time it is on the calender
      droppable: true,
      editable: true,
      selectable: true,
      selectHelper: true,
      unselectAuto: false,
      nowIndicator: true,

      // alows drag and release creation of events
      select: function(start, end, allDay) {
        var title = prompt('Event Title:');
        var description = prompt('Event Description?')
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

               
        }
        $('#calendar').fullCalendar('unselect');
      },

      // allows users to drag and drop events to reschedule them.
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

      // grabs all events from db to display on calendar
      events: function(start, end, timezone, callback) {
// ******************** PULL EVENTS FROM STORE***************
      },

      // attatches a description to event (possibly going to attatch this to a tooltip)

      minTime: '04:00:00', // when the calendar starts the day.
      // maxTime: '22:00:00', // when the calender ends the day.


      // adds a tooltip to calendar events (can also add img etc... to show more about the band/venue)
      eventMouseover: function(calEvent, jsEvent) {
        var tooltip = '<div class="tooltipevent" style="width:200px;height:auto;background:white;border-style:inset;position:absolute;z-index:10001;">' + calEvent.description + '</div>';
        var $tooltip = $(tooltip).appendTo('body');

        // this alows TT to follow mouse when moooosing over.
        $(this).mouseover(function(e) {
            $(this).css('z-index', 10000);
            $tooltip.fadeIn('500');
            $tooltip.fadeTo('10', 1.9);
        }).mousemove(function(e) {
            $tooltip.css('top', e.pageY + 10);
            $tooltip.css('left', e.pageX + 20);
        });
      },

      eventMouseout: function(calEvent, jsEvent) {
        $(this).css('z-index', 8);
        $('.tooltipevent').remove();
      },

      eventClick: function ( event, jsEvent, view ) {
        //will likely use to select events not necesarily change color
         console.log($(this))
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
