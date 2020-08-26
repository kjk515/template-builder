
import React, { Component } from 'react';
import { withStory } from '@nara.platform/storybook';

import { ProjectMonthlyLog } from '@nara.drama/timecard';
import moment from 'moment';
import docs from './docs';


export const useMoment = withStory(
  //
  class Story extends Component {
    //
    private date = moment('2020-07');

    private projectId = '7ce1cd18-52c1-400c-9ef9-e0657f03950b'; // TODO remove after local test


    render() {
      //
      // FIXME: by hkkang - 특정 날짜로 지정하여 컴포넌트 기본 상태(잘 나오는)를 보여줄 수 있도록 구성 -> 월만 지정하면 1년 뒤 해당 연도의 아무 데이터가 없는 샘플이 보여짐.. 연도도 지정
      // 완료
      return (
        <ProjectMonthlyLog
          projectId={this.projectId}
          date={this.date}
        >
          <ProjectMonthlyLog.Header />
          <ProjectMonthlyLog.Content />
          <ProjectMonthlyLog.Footer />
        </ProjectMonthlyLog>
      );
    }
  },
);

useMoment.story = {
  name: 'useMoment',
};

export default {
  title: 'component/ProjectMonthlyLog',
  component: docs.component,
  subcomponents: docs.subcomponents,
  parameters: { ...docs.parameters },
};
