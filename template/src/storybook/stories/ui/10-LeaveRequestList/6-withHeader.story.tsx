
import React from 'react';
import { withStory } from '@nara.platform/storybook';

import { LeaveRequestList } from '@nara.drama/timecard';
import { DefaultDataComponent } from '~/storybook/shared';
import docs from './docs';


export const withHeader = withStory(
  //
  class Story extends DefaultDataComponent {
    //
    date = new Date('2020-07');


    render() {
      //
      const projectId = this.getProjectId();

      if (!projectId) {
        return null;
      }

      return (
        <LeaveRequestList
          projectId={projectId}
          personal
          date={this.date}
        >
          <LeaveRequestList.Header />
          <LeaveRequestList.Content />
        </LeaveRequestList>
      );
    }
  },
);

withHeader.story = {
  name: 'withHeader',
};

export default {
  title: 'component/LeaveRequestList',
  component: docs.component,
  subcomponents: docs.subcomponents,
  parameters: { ...docs.parameters },
};
