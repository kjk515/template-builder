
import React from 'react';
import { withStory } from '@nara.platform/storybook';

import { LeaveRequest } from '@nara.drama/timecard';
import { DefaultDataComponent } from '~/storybook/shared';
import docs from './docs';


export const testPersonalRead = withStory(
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
          projectId={projectId}
          leavePlanId="12adaf9c-226c-4989-bd45-d79b87473ea4"
          personal
        >
          <LeaveRequest.Content />
          <LeaveRequest.ActionButtons />
        </LeaveRequest>
      );
    }
  },
);

testPersonalRead.story = {
  name: 'testPersonalRead',
};

export default {
  title: 'component/LeaveRequest',
  component: docs.component,
  subcomponents: docs.subcomponents,
  parameters: { ...docs.parameters },
};
