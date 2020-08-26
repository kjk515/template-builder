
import React from 'react';
import { withStory } from '@nara.platform/storybook';

import { ProjectMonthlyLeaveLog } from '@nara.drama/timecard';
import docs from './docs';
import { DefaultDataComponent } from '~/storybook/shared';


export const basic = withStory(
  //
  class Story extends DefaultDataComponent {
    //
    private today = new Date();

    render() {
      //
      return (
        <ProjectMonthlyLeaveLog
          projectId={this.getProjectId()}
          date={this.today}
        >
          <ProjectMonthlyLeaveLog.Header />
          <ProjectMonthlyLeaveLog.Content />
          <ProjectMonthlyLeaveLog.Footer />
        </ProjectMonthlyLeaveLog>
      );
    }
  },
);

basic.story = {
  name: 'basic',
};

export default {
  title: 'component/ProjectMonthlyLeaveLog',
  component: docs.component,
  subcomponents: docs.subcomponents,
  parameters: { ...docs.parameters },
};
