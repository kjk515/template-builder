
import React from 'react';
import { withStory } from '@nara.platform/storybook';

import { LeaveChecker } from '@nara.drama/timecard';
import { Modal } from '@nara.platform/react-ui';
import { DefaultDataComponent } from '~/storybook/shared';
import docs from './docs';


export const testAdmin = withStory(
  //
  class Story extends DefaultDataComponent {
    //
    render() {
      //
      const leaveId = this.getFirstLeaveId();

      if (!leaveId) {
        return leaveId;
      }

      return (
        <LeaveChecker
          leaveId={leaveId}
        >
          <LeaveChecker.Content />
          <Modal.CloseButton>확인</Modal.CloseButton>
        </LeaveChecker>
      );
    }
  },
);

testAdmin.story = {
  name: 'testAdmin',
};

export default {
  title: 'component/LeaveChecker',
  component: docs.component,
  subcomponents: docs.subcomponents,
  parameters: { ...docs.parameters },
};
