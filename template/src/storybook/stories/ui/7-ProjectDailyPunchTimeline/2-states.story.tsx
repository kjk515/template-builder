
import React from 'react';
import { withStory, PanelGroup } from '@nara.platform/storybook';

import { ProjectDailyPunchTimeline } from '@nara.drama/timecard';
import moment from 'moment';
import docs from './docs';
import { DefaultDataComponent } from '~/storybook/shared';


export const states = withStory(
  //
  class Story extends DefaultDataComponent {
    //
    private basicDate = moment();
    private emptyDate = moment('2020-02-09');

    render() {
      //
      return (
        <PanelGroup
          panels={[
            {
              title: 'basic',
              component: (
                <ProjectDailyPunchTimeline
                  date={this.basicDate}
                  projectId={this.getProjectId()}
                >
                  <ProjectDailyPunchTimeline.Header />
                  <ProjectDailyPunchTimeline.Content />
                  <ProjectDailyPunchTimeline.Footer />
                </ProjectDailyPunchTimeline>
              ),
            },
            {
              title: 'empty',
              component: (
                <ProjectDailyPunchTimeline
                  date={this.emptyDate}
                  projectId={this.getProjectId()}
                >
                  <ProjectDailyPunchTimeline.Header />
                  <ProjectDailyPunchTimeline.Content />
                  <ProjectDailyPunchTimeline.Footer />
                </ProjectDailyPunchTimeline>
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
  title: 'component/ProjectDailyPunchTimeline',
  component: docs.component,
  subcomponents: docs.subcomponents,
  parameters: { ...docs.parameters },
};
