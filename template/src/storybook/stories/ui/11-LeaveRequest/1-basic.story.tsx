
import React from 'react';
import { withStory } from '@nara.platform/storybook';

import { LeaveRequest } from '@nara.drama/timecard';
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
        <LeaveRequest
          projectId="7230afa3-ed84-46a2-b80a-6668aa58288c"
        >
          <LeaveRequest.Content />
        </LeaveRequest>
      );
    }
  },
);

basic.story = {
  name: 'basic',
};

export default {
  title: 'component/LeaveRequest',
  component: docs.component,
  subcomponents: docs.subcomponents,
  parameters: { ...docs.parameters },
};
