
import React from 'react';
import { withStory, PanelGroup } from '@nara.platform/storybook';

import { ProjectMonthlyLeaveLog } from '@nara.drama/timecard';
import docs from './docs';
import { DefaultDataComponent } from '~/storybook/shared';


export const states = withStory(
  //
  class Story extends DefaultDataComponent {
    //
    private basicDate = new Date('2020-07');
    private emptyDate = new Date('2020-09');

    render() {
      //
      return (
        <PanelGroup
          panels={[
            {
              title: 'basic',
              component: (
                <ProjectMonthlyLeaveLog
                  projectId={this.getProjectId()}
                  date={this.basicDate}
                >
                  <ProjectMonthlyLeaveLog.Header />
                  <ProjectMonthlyLeaveLog.Content />
                  <ProjectMonthlyLeaveLog.Footer />
                </ProjectMonthlyLeaveLog>
              ),
            },
            {
              title: 'empty',
              component: (
                <ProjectMonthlyLeaveLog
                  projectId={this.getProjectId()}
                  date={this.basicDate}
                >
                  <ProjectMonthlyLeaveLog.Header />
                  <ProjectMonthlyLeaveLog.Content />
                </ProjectMonthlyLeaveLog>
              ),
            },
          ]}
        />
      );
    }
  },
);

states.story = {
  name: 'states',
};

export default {
  title: 'component/ProjectMonthlyLeaveLog',
  component: docs.component,
  subcomponents: docs.subcomponents,
  parameters: { ...docs.parameters },
};
