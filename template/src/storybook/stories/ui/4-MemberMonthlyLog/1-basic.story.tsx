
import React from 'react';
import { withStory } from '@nara.platform/storybook';

import { MemberMonthlyLog } from '@nara.drama/timecard';
import docs from './docs';
import { DefaultDataComponent } from '~/storybook/shared';


export const basic = withStory(
  //
  class Story extends DefaultDataComponent {
    //
    render() {
      //
      return (
        <MemberMonthlyLog
          projectId={this.getProjectId()}
          personal
        >
          <MemberMonthlyLog.Header />
          <MemberMonthlyLog.Content />
        </MemberMonthlyLog>
      );
    }
  },
);

basic.story = {
  name: 'basic',
};

export default {
  title: 'component/MemberMonthlyLog',
  component: docs.component,
  subcomponents: docs.subcomponents,
  parameters: { ...docs.parameters },
};
