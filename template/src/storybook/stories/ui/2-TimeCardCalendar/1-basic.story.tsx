
import React from 'react';
import { withStory } from '@nara.platform/storybook';

import { TimeCardCalendar } from '@nara.drama/timecard';
import { DefaultDataComponent } from '~/storybook/shared';
import docs from './docs';


export const basic = withStory(
  //
  class Story extends DefaultDataComponent {
    //
    render() {
      //
      const projectId = this.getProjectId();

      if (!projectId) {
        return null;
      }

      return (
        <TimeCardCalendar
          eventType={TimeCardCalendar.EventType.PunchInOut}
          projectId={projectId}
        >
          <TimeCardCalendar.Header />
          <TimeCardCalendar.Content />
        </TimeCardCalendar>
      );
    }
  },
);

basic.story = {
  name: 'basic',
};

export default {
  title: 'component/TimeCardCalendar',
  component: docs.component,
  subcomponents: docs.subcomponents,
  parameters: { ...docs.parameters },
};
