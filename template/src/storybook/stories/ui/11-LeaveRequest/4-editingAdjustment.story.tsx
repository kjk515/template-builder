
import React from 'react';
import { withStory } from '@nara.platform/storybook';

import { LeaveRequest } from '@nara.drama/timecard';
import { DefaultDataComponent } from '~/storybook/shared';
import docs from './docs';


export const type = withStory(
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
          editingAdjustment
          projectId={projectId}
          leavePlanId="test"
        >
          <LeaveRequest.Content />
          <LeaveRequest.ActionButtons />
        </LeaveRequest>
      );
    }
  },
);

type.story = {
  name: 'type',
};

export default {
  title: 'component/LeaveRequest',
  component: docs.component,
  subcomponents: docs.subcomponents,
  parameters: { ...docs.parameters },
};
