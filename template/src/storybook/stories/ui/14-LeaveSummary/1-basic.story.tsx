
import React, { Component } from 'react';
import { withStory } from '@nara.platform/storybook';

import { LeaveSummary } from '@nara.drama/timecard';
import docs from './docs';


export const basic = withStory(
  //
  class Story extends Component {
    //
    private today = new Date();

    render() {
      //
      return (
        <LeaveSummary
          date={this.today}
          memberId="1"
        />
      );
    }
  },
);

basic.story = {
  name: 'basic',
};

export default {
  title: 'component/LeaveSummary',
  component: docs.component,
  subcomponents: docs.subcomponents,
  parameters: { ...docs.parameters },
};
