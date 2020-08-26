
import React from 'react';
import { withStory } from '@nara.platform/storybook';

import { LeaveRequestList } from '@nara.drama/timecard';
import { DefaultDataComponent } from '~/storybook/shared';
import docs from './docs';


export const isPlan = withStory(
  //
  class Story extends DefaultDataComponent {
    //
    private today = new Date();


    render() {
      //
      const projectId = this.getProjectId();

      if (!projectId) {
        return null;
      }

      return (
        <LeaveRequestList
          projectId={projectId}
          date={this.today}
          isPlan
        >
          <LeaveRequestList.Content />
        </LeaveRequestList>
      );
    }
  },
);

isPlan.story = {
  name: 'isPlan',
};

export default {
  title: 'component/LeaveRequestList',
  component: docs.component,
  subcomponents: docs.subcomponents,
  parameters: { ...docs.parameters },
};
