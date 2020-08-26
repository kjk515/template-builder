
import React from 'react';
import { withStory } from '@nara.platform/storybook';

import { ProjectDailyPunchTimeline } from '@nara.drama/timecard';
import docs from './docs';
import { DefaultDataComponent } from '~/storybook/shared';


export const basic = withStory(
  //
  class Story extends DefaultDataComponent {
    //
    render() {
      //
      return (
        <ProjectDailyPunchTimeline
          projectId={this.getProjectId()}
        >
          <ProjectDailyPunchTimeline.Header />
          <ProjectDailyPunchTimeline.Content />
          <ProjectDailyPunchTimeline.Footer />
        </ProjectDailyPunchTimeline>
      );
    }
  },
);

basic.story = {
  name: 'basic',
};

export default {
  title: 'component/ProjectDailyPunchTimeline',
  component: docs.component,
  subcomponents: docs.subcomponents,
  parameters: { ...docs.parameters },
};
