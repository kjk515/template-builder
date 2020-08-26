
import React, { Component } from 'react';
import moment from 'moment';
import { withStory, PanelGroup } from '@nara.platform/storybook';

import { MemberMonthlyPunchTimeline } from '@nara.drama/timecard';
import docs from './docs';


export const states = withStory(
  //
  class Story extends Component {
    //
    private basicDate = moment();

    private projectId = '7ce1cd18-52c1-400c-9ef9-e0657f03950b';
    private memberId = '0b6718bd-9959-413f-a046-fc600781bed8';

    render() {
      //
      return (
        <PanelGroup
          panels={[
            {
              title: 'basic',
              component: (
                <MemberMonthlyPunchTimeline
                  memberId={this.memberId}
                  yearMonth={this.basicDate}
                >
                  <MemberMonthlyPunchTimeline.Content />
                </MemberMonthlyPunchTimeline>
              ),
            },
            {
              title: 'personal',
              component: (
                <MemberMonthlyPunchTimeline
                  personal
                  projectId={this.projectId}
                  yearMonth={this.basicDate}
                >
                  <MemberMonthlyPunchTimeline.Content />
                </MemberMonthlyPunchTimeline>
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
  title: 'component/MemberMonthlyPunchTimeline',
  component: docs.component,
  subcomponents: docs.subcomponents,
  parameters: { ...docs.parameters },
};
