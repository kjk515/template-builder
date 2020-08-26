
import React from 'react';
import { withStory, PanelGroup } from '@nara.platform/storybook';

import { TimeCardCalendar } from '@nara.drama/timecard';
import moment from 'moment';
import { DefaultDataComponent } from '~/storybook/shared';
import docs from './docs';


export const states = withStory(
  //
  class Story extends DefaultDataComponent {
    //
    private defaultDate = moment('2020-08-09');
    private height = '450pt';


    render() {
      //
      const { MembersLeave, PunchInOut } = TimeCardCalendar.EventType;
      const projectId = this.getProjectId();

      if (!projectId) {
        return null;
      }

      return (
        <PanelGroup
          panels={[
            {
              title: `EventType.${MembersLeave}`,
              component: (
                <TimeCardCalendar
                  eventType={MembersLeave}
                  projectId={projectId}
                  defaultDate={this.defaultDate}
                >
                  <TimeCardCalendar.Content height={this.height} />
                </TimeCardCalendar>
              ),
            },
            {
              title: `EventType.${PunchInOut}`,
              component: (
                <TimeCardCalendar
                  eventType={PunchInOut}
                  projectId={projectId}
                  defaultDate={this.defaultDate}
                >
                  <TimeCardCalendar.Content height={this.height} />
                </TimeCardCalendar>
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
  title: 'component/TimeCardCalendar',
  component: docs.component,
  subcomponents: docs.subcomponents,
  parameters: { ...docs.parameters },
};
