
import React, { Component } from 'react';
import { withStory } from '@nara.platform/storybook';

import { YearLeaveList } from '@nara.drama/timecard';
import docs from './docs';


export const withHeader = withStory(
  //
  class Story extends Component {
    //
    render() {
      //
      return (
        <YearLeaveList
          projectId="1137981f-db9e-4221-823d-b166fc0fd9df"
        >
          <YearLeaveList.Header />
          <YearLeaveList.Content />
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
