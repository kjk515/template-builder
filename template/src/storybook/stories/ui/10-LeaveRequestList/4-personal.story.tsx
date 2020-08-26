
import React from 'react';
import { withStory } from '@nara.platform/storybook';

import { LeaveRequestList } from '@nara.drama/timecard';
import moment from 'moment';
import { DefaultDataComponent } from '~/storybook/shared';
import docs from './docs';


export const personal = withStory(
  //
  class Story extends DefaultDataComponent {
    //
    private today = moment();


    render() {
      //
      const projectId = this.getProjectId();

      if (!projectId) {
        return null;
      }


      return (
        <LeaveRequestList
          projectId="1137981f-db9e-4221-823d-b166fc0fd9df"
          personal
          date={this.today}
        >
          <LeaveRequestList.Content />
        </LeaveRequestList>
      );
    }
  },
);

personal.story = {
  name: 'personal',
};

export default {
  title: 'component/LeaveRequestList',
  component: docs.component,
  subcomponents: docs.subcomponents,
  parameters: { ...docs.parameters },
};
