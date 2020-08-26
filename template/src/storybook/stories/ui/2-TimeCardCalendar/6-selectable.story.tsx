
import React from 'react';
import { withStory } from '@nara.platform/storybook';

import { TimeCardCalendar } from '@nara.drama/timecard';
import moment from 'moment';
import docs from './docs';
import { DefaultDataComponent } from '~/storybook/shared';


export const selectable = withStory(
  //
  class Story extends DefaultDataComponent {
    //
    private defaultDate = moment('2020-08-09');

    render() {
      //
      const { MembersLeave, PunchInOut } = TimeCardCalendar.EventType;

      return (
        <TimeCardCalendar
          eventType={TimeCardCalendar.EventType.Selectable}
          selectableEventTypes={[MembersLeave, PunchInOut]}
          projectId={this.getProjectId()}
          defaultDate={this.defaultDate}
        >
          <TimeCardCalendar.Content />
        </TimeCardCalendar>
      );
    }
  },
);

selectable.story = {
  name: 'selectable',
};

export default {
  title: 'component/TimeCardCalendar',
  component: docs.component,
  subcomponents: docs.subcomponents,
  parameters: { ...docs.parameters },
};
