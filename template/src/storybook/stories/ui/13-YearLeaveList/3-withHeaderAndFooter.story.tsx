
import React from 'react';
import { withStory } from '@nara.platform/storybook';

import { YearLeaveList } from '@nara.drama/timecard';
import docs from './docs';
import { DefaultDataComponent } from '~/storybook/shared';


export const withHeader = withStory(
  //
  class Story extends DefaultDataComponent {
    //
    render() {
      //
      return (
        <YearLeaveList
          projectId={this.getProjectId()}
        >
          <YearLeaveList.Header />
          <YearLeaveList.Content />
          <YearLeaveList.Footer />
        </YearLeaveList>
      );
    }
  },
);

withHeader.story = {
  name: 'withHeader',
};

export default {
  title: 'component/YearLeaveList',
  component: docs.component,
  subcomponents: docs.subcomponents,
  parameters: { ...docs.parameters },
};
