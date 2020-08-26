
import React, { Component } from 'react';
import { withStory, storyLogger } from '@nara.platform/storybook';

import { MemberMonthlyLog, MemberMonthlyLogTypes } from '@nara.drama/timecard';
import docs from './docs';


export const onChange = withStory(
  //
  class Story extends Component {
    //
    private projectId = '7ce1cd18-52c1-400c-9ef9-e0657f03950b'; // TODO remove after local test

    onChange(params: MemberMonthlyLogTypes.ChangeDateParams) {
      //
      storyLogger(MemberMonthlyLog, 'onChange', {
        params,
      });
    }

    render() {
      //
      return (
        <MemberMonthlyLog
          projectId={this.projectId}
          personal
          onChange={this.onChange}
        >
          <MemberMonthlyLog.Header />
          <MemberMonthlyLog.Content />
        </MemberMonthlyLog>
      );
    }
  },
);

onChange.story = {
  name: 'onChange',
};

export default {
  title: 'component/MemberMonthlyLog',
  component: docs.component,
  subcomponents: docs.subcomponents,
  parameters: { ...docs.parameters },
};
