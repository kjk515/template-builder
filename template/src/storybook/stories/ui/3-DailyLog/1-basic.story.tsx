
import React, { Component } from 'react';
import { withStory } from '@nara.platform/storybook';
import { DailyLog } from '@nara.drama/timecard';
import moment from 'moment';
import docs from './docs';


export const basic = withStory(
  //
  class Story extends Component {
    //
    private basicStateDate = moment('2020-07-28');    // 테스트 데이터 (휴가, 휴가/상세)
    private today = moment();   // today


    render() {
      //
      // FIXME: by hkkang - [DailyLog 전체] 휴가 + 출퇴근 데이터가 있는 날짜로 지정하여 컴포넌트 기본 상태(잘 나오는)를 보여줄 수 있도록 구성
      // 해당 데이터는 2-state.story.tsx에서 보여주고 basic은 기본 데이터로 금일 테스트했을때 반영될 수 있게끔 비워두는것은 어떨까요???
      return (
        <DailyLog date={this.basicStateDate}>
          <DailyLog.DayOffContent detailed />
        </DailyLog>
      );
    }
  },
);

basic.story = {
  name: 'basic',
};

export default {
  title: 'component/DailyLog',
  component: docs.component,
  subcomponents: docs.subcomponents,
  parameters: { ...docs.parameters },
};
