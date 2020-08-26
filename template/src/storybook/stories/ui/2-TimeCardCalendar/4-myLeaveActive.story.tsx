
import React, { Component } from 'react';
import { storyLogger, withStory } from '@nara.platform/storybook';

import { TimeCardCalendar, TimeCardCalendarTypes } from '@nara.drama/timecard';
import moment from 'moment';
import docs from './docs';


// FIXME Background-color
export const myLeaveActive = withStory(
  //
  class Story extends Component {
    //
    private defaultDate = moment('2020-08-09');

    private projectId = '7ce1cd18-52c1-400c-9ef9-e0657f03950b'; // TODO remove after local test


    onClickDayEvent(event: React.SyntheticEvent, params: TimeCardCalendarTypes.MembersLeaveEventParams) {
      //
      storyLogger(TimeCardCalendar, 'onClickDayEvent', {
        params,
      });
    }

    render() {
      //
      return (
        <TimeCardCalendar
          eventType={TimeCardCalendar.EventType.MembersLeave}
          projectId={this.projectId}
          defaultDate={this.defaultDate}
        >
          <TimeCardCalendar.Header />
          <TimeCardCalendar.Content
            myLeaveActive
            onClickMembersLeaveEvent={this.onClickDayEvent}
          />
        </TimeCardCalendar>
      );
    }
  },
);

myLeaveActive.story = {
  name: 'myLeaveActive',
};

export default {
  title: 'component/TimeCardCalendar',
  component: docs.component,
  subcomponents: docs.subcomponents,
  parameters: { ...docs.parameters },
};
