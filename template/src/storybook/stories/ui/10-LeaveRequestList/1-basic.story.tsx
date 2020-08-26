
import React from 'react';
import { withStory } from '@nara.platform/storybook';

import { LeaveRequestList } from '@nara.drama/timecard';
import { DefaultDataComponent } from '~/storybook/shared';
import docs from './docs';


export const basic = withStory(
  //
  class Story extends DefaultDataComponent {
    //
    private basicDate = new Date('2020-07');


    render() {
      //
      const projectId = this.getProjectId();

      if (!projectId) {
        return null;
      }

      return (
        <LeaveRequestList
          projectId={projectId}
          date={this.basicDate}
        >
          <LeaveRequestList.Content />
        </LeaveRequestList>
      );
    }
  },
);

basic.story = {
  name: 'basic',
};

export default {
  title: 'component/LeaveRequestList',
  component: docs.component,
  subcomponents: docs.subcomponents,
  parameters: { ...docs.parameters },
};
