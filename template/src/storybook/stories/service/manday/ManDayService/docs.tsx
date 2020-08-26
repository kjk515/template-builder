
import React from 'react';

import { ManDayService } from '@nara.drama/timecard';
// import { DocsPage, docsUtils } from '@nara.platform/storybook';
import { DocsPage } from '@nara.platform/storybook';


// const docsProps = docsUtils.getModelDoc(ManDayService);

export default {
  title: 'service/ManDayService',
  component: ManDayService,
  parameters: {
    docs: {
      page: () => (
        <DocsPage
          description="ManDayService 입니다."
          // props={docsProps}
        />
      ),
    },
  },
};
