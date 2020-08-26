
import React from 'react';
import { withStory } from '@nara.platform/storybook';

import { LeaveRequest } from '@nara.drama/timecard';
import { DefaultDataComponent } from '~/storybook/shared';
import docs from './docs';


export const leavePlanId = withStory(
  //
  class Story extends DefaultDataComponent {
    //
    render() {
      //
      const projectId = this.getProjectId();
      const leavePlanId = this.getFirstLeavePlanId();

      if (!leavePlanId) {
        return null;
      }

      return (
        <LeaveRequest
          projectId={projectId}
          leavePlanId={leavePlanId}
        >
          <LeaveRequest.Content />
        </LeaveRequest>
      );
    }
  },
);

leavePlanId.story = {
  name: 'leavePlanId',
};

export default {
  title: 'component/LeaveRequest',
  component: docs.component,
  subcomponents: docs.subcomponents,
  parameters: { ...docs.parameters },
};
