
import React from 'react';
import { DocsPage } from '@nara.platform/storybook';

import { ProjectModel } from '@nara.drama/timecard';


// const docsProps = docsUtils.getModelDoc(ProjectModel);

export default {
  title: 'model/ProjectModel',
  component: ProjectModel,
  parameters: {
    docs: {
      page: () => (
        <DocsPage
          description="Project 생성 컴포넌트의 뷰모델입니다."
          // props={docsProps}
        />
      ),
    },
  },
};
