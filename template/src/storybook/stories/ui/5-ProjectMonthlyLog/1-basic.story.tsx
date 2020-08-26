
import React from 'react';
import { withStory } from '@nara.platform/storybook';

import moment from 'moment';
import { ProjectMonthlyLog } from '@nara.drama/timecard';
import docs from './docs';
import { DefaultDataComponent } from '~/storybook/shared';


export const basic = withStory(
  //
  class Story extends DefaultDataComponent {
    //
    private date = moment();

    render() {
      //
      return (
        <ProjectMonthlyLog
          date={this.date}
          projectId={this.getProjectId()}
        >
          <ProjectMonthlyLog.Header />
          <ProjectMonthlyLog.Content />
          <ProjectMonthlyLog.Footer />
        </ProjectMonthlyLog>
      );
    }
  },
);

basic.story = {
  name: 'basic',
};

export default {
  title: 'component/ProjectMonthlyLog',
  component: docs.component,
  subcomponents: docs.subcomponents,
  parameters: { ...docs.parameters },
};
