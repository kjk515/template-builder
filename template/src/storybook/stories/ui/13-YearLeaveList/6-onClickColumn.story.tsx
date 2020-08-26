
import React, { Component } from 'react';
import { withStory, storyLogger } from '@nara.platform/storybook';

import { YearLeaveList, YearLeaveRequestListTypes } from '@nara.drama/timecard';
import docs from './docs';


export const onClickColumn = withStory(
  //
  class Story extends Component {
    //
    onClickColumn(params: YearLeaveRequestListTypes.ClickColumnParams) {
      //
      storyLogger(YearLeaveList, 'onClickColumn', {
        params,
      });
    }

    render() {
      //
      return (
        <YearLeaveList
          projectId="1137981f-db9e-4221-823d-b166fc0fd9df"
          onClickColumn={this.onClickColumn}
        >
          <YearLeaveList.Content />
        </YearLeaveList>
      );
    }
  },
);

onClickColumn.story = {
  name: 'onClickColumn',
};

export default {
  title: 'component/YearLeaveList',
  component: docs.component,
  subcomponents: docs.subcomponents,
  parameters: { ...docs.parameters },
};
