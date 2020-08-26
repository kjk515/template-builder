
import React, { Component } from 'react';
import { withStory } from '@nara.platform/storybook';

import { DailyLog } from '@nara.drama/timecard';
import moment from 'moment';
import docs from './docs';


export const useMoment = withStory(
  //
  class Story extends Component {
    //
    private date = moment();


    render() {
      //
      return (
        <DailyLog date={this.date}>
          <DailyLog.DayOffContent />
        </DailyLog>
      );
    }
  },
);

useMoment.story = {
  name: 'useMoment',
};

export default {
  title: 'component/DailyLog',
  component: docs.component,
  subcomponents: docs.subcomponents,
  parameters: { ...docs.parameters },
};
