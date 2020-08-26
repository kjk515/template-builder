
import React from 'react';
import { withStory } from '@nara.platform/storybook';

import { LeaveRequestList } from '@nara.drama/timecard';
import moment from 'moment';
import { DefaultDataComponent } from '~/storybook/shared';
import docs from './docs';


export const member = withStory(
  //
  class Story extends DefaultDataComponent {
    //
    private today = moment();


    render() {
      //
      const projectId = this.getProjectId();

      if (!projectId) {
        return null;
      }

      return (
        <LeaveRequestList
          projectId={projectId}
          memberId="TODO"
          date={this.today}
        >
          <LeaveRequestList.Content />
        </LeaveRequestList>
      );
    }
  },
);

member.story = {
  name: 'member',
};

export default {
  title: 'component/LeaveRequestList',
  component: docs.component,
  subcomponents: docs.subcomponents,
  parameters: { ...docs.parameters },
};
