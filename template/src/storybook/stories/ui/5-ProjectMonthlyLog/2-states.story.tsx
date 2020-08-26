
import React, { Component } from 'react';
import { withStory, PanelGroup } from '@nara.platform/storybook';

import { ProjectMonthlyLog } from '@nara.drama/timecard';
import docs from './docs';


export const states = withStory(
  //
  class Story extends Component {
    //
    private basicDate = new Date('2020-07');
    private emptyDate = new Date('2020-05');

    private projectId = '50ebdeaa-01d1-41f2-918d-16a5d3cbd6a6'; // TODO remove after local test
    private projectWithManyMembersId = '95409b74-0504-4e47-ac5d-25269ebc2d7c'; // TODO remove after local test


    render() {
      //
      // FIXME: by hkkang - 특정 날짜로 지정하여 컴포넌트 기본 상태(잘 나오는)를 보여줄 수 있도록 구성 -> 여러명의 구성원과 근무, 휴가, 반차가 포함된 월 데이터
      return (
        <PanelGroup
          panels={[
            {
              title: 'single page',
              component: (
                <ProjectMonthlyLog
                  projectId={this.projectId}
                  date={this.basicDate}
                >
                  <ProjectMonthlyLog.Header />
                  <ProjectMonthlyLog.Content />
                  <ProjectMonthlyLog.Footer />
                </ProjectMonthlyLog>
              ),
            },
            {
              title: 'multiple pages',
              component: (
                <ProjectMonthlyLog
                  projectId={this.projectWithManyMembersId}
                  date={this.basicDate}
                >
                  <ProjectMonthlyLog.Header />
                  <ProjectMonthlyLog.Content />
                  <ProjectMonthlyLog.Footer />
                </ProjectMonthlyLog>
              ),
            },
            {
              title: 'multiple pages - 페이지 별 명수 조정',
              component: (
                <ProjectMonthlyLog
                  projectId={this.projectWithManyMembersId}
                  date={this.basicDate}
                >
                  <ProjectMonthlyLog.Header />
                  <ProjectMonthlyLog.Content />
                  <ProjectMonthlyLog.Footer />
                </ProjectMonthlyLog>
              ),
            },
            {
              title: 'empty',
              component: (
                <ProjectMonthlyLog
                  projectId={this.projectWithManyMembersId}
                  date={this.emptyDate}
                >
                  <ProjectMonthlyLog.Header />
                  <ProjectMonthlyLog.Content />
                  <ProjectMonthlyLog.Footer />
                </ProjectMonthlyLog>
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
  title: 'component/ProjectMonthlyLog',
  component: docs.component,
  subcomponents: docs.subcomponents,
  parameters: { ...docs.parameters },
};
