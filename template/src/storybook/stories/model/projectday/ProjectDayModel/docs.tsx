
import React from 'react';
import { DocsPage } from '@nara.platform/storybook';

import { ProjectDayModel } from '@nara.drama/timecard';


// const docsProps = docsUtils.getModelDoc(ProjectDayModel);

export default {
  title: 'model/ProjectDayModel',
  component: ProjectDayModel,
  parameters: {
    docs: {
      page: () => (
        <DocsPage
          description="ProjectDay 뷰모델입니다."
          // props={docsProps}
        />
      ),
    },
  },
};
