
import React from 'react';
import { withStory } from '@nara.platform/storybook';

import { YearLeaveList } from '@nara.drama/timecard';
import docs from './docs';
import { DefaultDataComponent } from '~/storybook/shared';


export const basic = withStory(
  //
  class Story extends DefaultDataComponent {
    //
    render() {
      //
      return (
        <YearLeaveList
          projectId={this.getProjectId()}
        >
          <YearLeaveList.Content />
        </YearLeaveList>
      );
    }
  },
);

basic.story = {
  name: 'basic',
};

export default {
  title: 'component/YearLeaveList',
  component: docs.component,
  subcomponents: docs.subcomponents,
  parameters: { ...docs.parameters },
};
