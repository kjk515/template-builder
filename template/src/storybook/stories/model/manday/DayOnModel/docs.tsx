
import React from 'react';
import { DocsPage } from '@nara.platform/storybook';

import { DayOnModel } from '@nara.drama/timecard';


// const docsProps = docsUtils.getModelDoc(DayOnModel);

export default {
  title: 'model/DayOnModel',
  component: DayOnModel,
  parameters: {
    docs: {
      page: () => (
        <DocsPage
          description=""
          // props={docsProps}
        />
      ),
    },
  },
};
