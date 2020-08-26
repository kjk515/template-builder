
import React from 'react';
import { withStory } from '@nara.platform/storybook';

import { ProjectMonthlyLeaveLog } from '@nara.drama/timecard';
import moment from 'moment';
import docs from './docs';
import { DefaultDataComponent } from '~/storybook/shared';


export const useMoment = withStory(
  //
  class Story extends DefaultDataComponent {
    //
    private date = moment().month(7);

    render() {
      //
      return (
        <ProjectMonthlyLeaveLog
          projectId={this.getProjectId()}
          date={this.date}
        >
          <ProjectMonthlyLeaveLog.Header />
          <ProjectMonthlyLeaveLog.Content />
          <ProjectMonthlyLeaveLog.Footer />
        </ProjectMonthlyLeaveLog>
      );
    }
  },
);

useMoment.story = {
  name: 'useMoment',
};

export default {
  title: 'component/ProjectMonthlyLeaveLog',
  component: docs.component,
  subcomponents: docs.subcomponents,
  parameters: { ...docs.parameters },
};
