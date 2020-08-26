
import React from 'react';
import { withStory } from '@nara.platform/storybook';

import { LeaveRequest } from '@nara.drama/timecard';
import { DefaultDataComponent } from '~/storybook/shared';
import docs from './docs';


export const testAdjustmentRequest = withStory(
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
          leavePlanId="12adaf9c-226c-4989-bd45-d79b87473ea4"
        >
          <LeaveRequest.Content />
          <LeaveRequest.ActionButtons />
        </LeaveRequest>
      );
    }
  },
);

testAdjustmentRequest.story = {
  name: 'testAdjustmentRequest',
};

export default {
  title: 'component/LeaveRequest',
  component: docs.component,
  subcomponents: docs.subcomponents,
  parameters: { ...docs.parameters },
};
