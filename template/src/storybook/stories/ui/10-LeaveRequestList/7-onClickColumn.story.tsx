
import React, { Component } from 'react';
import { withStory, storyLogger } from '@nara.platform/storybook';

import { LeaveRequestList, LeaveRequestListTypes } from '@nara.drama/timecard';
import moment from 'moment';
import docs from './docs';


export const onClickColumn = withStory(
  //
  class Story extends Component {
    //
    onClickColumn(params: LeaveRequestListTypes.ClickColumnParams) {
      //
      storyLogger(LeaveRequestList, 'onClickColumn', {
        params,
      });
    }

    render() {
      //
      return (
        <LeaveRequestList
          projectId="1137981f-db9e-4221-823d-b166fc0fd9df"
          date={moment()}
          onClickColumn={this.onClickColumn}
        >
          <LeaveRequestList.Content />
        </LeaveRequestList>
      );
    }
  },
);

onClickColumn.story = {
  name: 'onClickColumn',
};

export default {
  title: 'component/LeaveRequestList',
  component: docs.component,
  subcomponents: docs.subcomponents,
  parameters: { ...docs.parameters },
};
