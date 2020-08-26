
import React from 'react';
import { withStory } from '@nara.platform/storybook';

import { LeaveChecker } from '@nara.drama/timecard';
import { DefaultDataComponent } from '~/storybook/shared';
import docs from './docs';


export const basic = withStory(
  //
  class Story extends DefaultDataComponent {
    //
    render() {
      //
      const leaveId = this.getFirstLeaveId();

      if (!leaveId) {
        return null;
      }

      return (
        <LeaveChecker
          leaveId={leaveId}
        >
          <LeaveChecker.Content />
        </LeaveChecker>
      );
    }
  },
);

basic.story = {
  name: 'basic',
};

export default {
  title: 'component/LeaveChecker',
  component: docs.component,
  subcomponents: docs.subcomponents,
  parameters: { ...docs.parameters },
};
