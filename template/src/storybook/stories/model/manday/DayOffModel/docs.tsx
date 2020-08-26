
import React from 'react';
import { DocsPage } from '@nara.platform/storybook';

import { DayOffModel } from '@nara.drama/timecard';


// const docsProps = docsUtils.getModelDoc(DayOffModel);

export default {
  title: 'model/DayOffModel',
  component: DayOffModel,
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
