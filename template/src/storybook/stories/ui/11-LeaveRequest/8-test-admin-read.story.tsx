
import React from 'react';
import { withStory } from '@nara.platform/storybook';

import { LeaveRequest } from '@nara.drama/timecard';
import { Modal } from '@nara.platform/react-ui';
import { DefaultDataComponent } from '~/storybook/shared';
import docs from './docs';


export const testAdminAdjustment = withStory(
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
        >
          <LeaveRequest.Content />
          <Modal.CloseButton>조정요청</Modal.CloseButton>
          <Modal.CloseButton>확인</Modal.CloseButton>
        </LeaveRequest>
      );
    }
  },
);

testAdminAdjustment.story = {
  name: 'testAdminAdjustment',
};

export default {
  title: 'component/LeaveRequest',
  component: docs.component,
  subcomponents: docs.subcomponents,
  parameters: { ...docs.parameters },
};
