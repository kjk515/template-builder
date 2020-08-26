
import React from 'react';
import { autobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';
import { withStory, storyLogger } from '@nara.platform/storybook';

import { TimeCardCalendar, TimeCardCalendarTypes } from '@nara.drama/timecard';
import moment from 'moment';
import docs from './docs';
import { DefaultDataComponent } from '~/storybook/shared';


export const punchInOut = withStory(() => {
  //
  @observer
  @autobind
  class Story extends DefaultDataComponent {
    //
    private defaultDate = moment('2020-08-09');

    onClickPunchInOutButton(manDayId: string) {
      //
      storyLogger('TimeCardCalendar.Content', `onClickPunchInOutButton, manDayId=${manDayId}`);
    }

    onClickPunchInOutEvent(event: React.SyntheticEvent, params: TimeCardCalendarTypes.PunchInOutEventParams) {
      //
      storyLogger('TimeCardCalendar.Content', `onClickPunchInOutEvent, manDayId=${params.manDayId}`);
    }

    render() {
      //
      return (
        <TimeCardCalendar
          eventType={TimeCardCalendar.EventType.PunchInOut}
          projectId={this.getProjectId()}
          defaultDate={this.defaultDate}
        >
          <TimeCardCalendar.Header />
          <TimeCardCalendar.Content
            onClickPunchInOut={this.onClickPunchInOutButton}
            onClickPunchInOutEvent={this.onClickPunchInOutEvent}
          />
        </TimeCardCalendar>
      );
    }
  }

  return Story;
});

punchInOut.story = {
  name: 'punchInOut',
};

export default {
  title: 'component/TimeCardCalendar',
  component: docs.component,
  subcomponents: docs.subcomponents,
  parameters: { ...docs.parameters },
};
