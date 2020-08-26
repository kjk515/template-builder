
import React, { Component } from 'react';
import { withStory, PanelGroup } from '@nara.platform/storybook';

import { MemberMonthlyLog } from '@nara.drama/timecard';
import docs from './docs';


export const states = withStory(
  //
  class Story extends Component {
    //
    private specificDate = new Date('2020-08'); // or moment object;
    private emptyDate = new Date('2020-06');

    private projectId = '7ce1cd18-52c1-400c-9ef9-e0657f03950b'; // TODO remove after local test
    private memberId = '0b6718bd-9959-413f-a046-fc600781bed8'; // TODO remove after local test


    render() {
      // TODO props 순서
      // FIXME: by hkkang - 특정 날짜로 지정하여 컴포넌트 기본 상태(잘 나오는)를 보여줄 수 있도록 구성 -> 헤더의 근무일, 근무시간 데이터가 있고, 월에 출퇴근, 휴가가, 반차가 포함 되어 있는 데이터
      return (
        <PanelGroup
          panels={[
            {
              title: 'memberId (특정 사용자)',
              component: (
                <MemberMonthlyLog
                  projectId={this.projectId}
                  memberId={this.memberId}
                  defaultDate={this.specificDate}
                >
                  <MemberMonthlyLog.Header />
                  <MemberMonthlyLog.Content />
                </MemberMonthlyLog>
              ),
            },
            {
              title: 'personal (로그인 사용자)',
              component: (
                <MemberMonthlyLog
                  projectId={this.projectId}
                  personal
                  defaultDate={this.specificDate}
                >
                  <MemberMonthlyLog.Header />
                  <MemberMonthlyLog.Content />
                </MemberMonthlyLog>
              ),
            },
            {
              title: '빈 경우',
              component: (
                <MemberMonthlyLog
                  projectId={this.projectId}
                  personal
                  defaultDate={this.emptyDate}
                >
                  <MemberMonthlyLog.Header />
                  <MemberMonthlyLog.Content />
                </MemberMonthlyLog>
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
  title: 'component/MemberMonthlyLog',
  component: docs.component,
  subcomponents: docs.subcomponents,
  parameters: { ...docs.parameters },
};
