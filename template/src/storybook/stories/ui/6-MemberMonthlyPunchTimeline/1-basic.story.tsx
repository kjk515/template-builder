
import React, { Component } from 'react';
import { withStory, storyLogger } from '@nara.platform/storybook';

import { MemberMonthlyPunchTimeline, MemberMonthlyPunchTimelineTypes } from '@nara.drama/timecard';
import docs from './docs';


export const basic = withStory(
  //
  class Story extends Component {
    //
    onClickPunchInOutTime(params: MemberMonthlyPunchTimelineTypes.PunchParams) {
      //
      storyLogger(MemberMonthlyPunchTimeline, 'onClickPunchInOutTime', {
        params,
      });
    }

    onClickPunchOut(params: MemberMonthlyPunchTimelineTypes.PunchParams) {
      //
      storyLogger(MemberMonthlyPunchTimeline, 'onClickPunchInOutTime', {
        params,
      });
    }

    render() {
      //
      // FIXME: by hkkang - manDayId는 추후 확장성을 고려해서 객체(data)에 넣어서(모아서) 전달
      return (
        <MemberMonthlyPunchTimeline
          personal
          projectId="7ce1cd18-52c1-400c-9ef9-e0657f03950b"
        >
          <MemberMonthlyPunchTimeline.Content
            onClickPunchInOutTime={this.onClickPunchInOutTime}
            onClickPunchInOut={this.onClickPunchOut}
          />
        </MemberMonthlyPunchTimeline>
      );
    }
  },
);

basic.story = {
  name: 'basic',
};

export default {
  title: 'component/MemberMonthlyPunchTimeline',
  component: docs.component,
  subcomponents: docs.subcomponents,
  parameters: { ...docs.parameters },
};
