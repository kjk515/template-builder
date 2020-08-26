
import React from 'react';

import { ManDaysService } from '@nara.drama/timecard';
// import { DocsPage, docsUtils } from '@nara.platform/storybook';
import { DocsPage } from '@nara.platform/storybook';


// const docsProps = docsUtils.getModelDoc(ManDaysService);

export default {
  title: 'service/ManDaysService',
  component: ManDaysService,
  parameters: {
    docs: {
      page: () => (
        <DocsPage
          description="ManDaysService 입니다."
          // props={docsProps}
        />
      ),
    },
  },
};
