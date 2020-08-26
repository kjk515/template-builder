
import React, { Component } from 'react';
import { withStory, PanelGroup } from '@nara.platform/storybook';

import { DailyLog } from '@nara.drama/timecard';
import moment from 'moment';

import docs from './docs';


export const states = withStory(
  //
  class Story extends Component {
    //
    private basicStateDate = moment('1992-05-22');    // 테스트 데이터 (휴가, 휴가/상세)
    private emptyStateDate = moment('1992-05-21');   // 테스트 데이터 (빈상태)


    render() {
      //
      // FIXME: by hkkang - 데이터의 유형대로 날짜 지정하여 예제 구성 -> 휴가+출퇴근 / 휴가 / 출퇴근 / 없음
      // 처리 완료
      return (
        <PanelGroup
          panels={[
            {
              title: '휴가',
              component: (
                <DailyLog date={this.basicStateDate}>
                  <DailyLog.DayOffContent />
                </DailyLog>
              ),
            },
            {
              title: '휴가/상세',
              component: (
                <DailyLog date={this.basicStateDate}>
                  <DailyLog.DayOffContent detailed />
                </DailyLog>
              ),
            },
            {
              title: '빈 상태',
              component: (
                <DailyLog date={this.emptyStateDate}>
                  <DailyLog.DayOffContent />
                </DailyLog>
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
  title: 'component/DailyLog',
  component: docs.component,
  subcomponents: docs.subcomponents,
  parameters: { ...docs.parameters },
};
