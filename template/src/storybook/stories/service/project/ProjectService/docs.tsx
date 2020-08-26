
import React from 'react';

import { ProjectService } from '@nara.drama/timecard';
import { DocsPage, docsUtils } from '@nara.platform/storybook';


const docsProps = docsUtils.getModelDoc(ProjectService);

export default {
  title: 'service/ProjectService',
  component: ProjectService,
  parameters: {
    docs: {
      page: () => (
        <DocsPage
          description="ProjectService 입니다."
          props={docsProps}
        />
      ),
    },
  },
};
