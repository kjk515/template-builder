
import React, { Component } from 'react';
import { withStory, storyLogger } from '@nara.platform/storybook';

import { TimeCardCalendarTypes, TimeCardCalendar } from '@nara.drama/timecard';
import moment from 'moment';

import docs from './docs';


export const membersLeave = withStory(
  //
  class Story extends Component {
    //
    private defaultDate = moment('2020-08-09');

    private projectId = 'cb1be048-2530-4f80-88f4-1451e22f5619'; // TODO remove after local test


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
          projectId={this.projectId}
          eventType={TimeCardCalendar.EventType.MembersLeave}
          defaultDate={this.defaultDate}
        >
          <TimeCardCalendar.Header />
          <TimeCardCalendar.Content
            onClickMembersLeaveEvent={this.onClickDayEvent}
          />
        </TimeCardCalendar>
      );
    }
  },
);

membersLeave.story = {
  name: 'membersLeave',
};

export default {
  title: 'component/TimeCardCalendar',
  component: docs.component,
  subcomponents: docs.subcomponents,
  parameters: { ...docs.parameters },
};
