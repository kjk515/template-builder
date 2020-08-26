
import React from 'react';
import { DocsPage } from '@nara.platform/storybook';

import { PunchOutCdo } from '@nara.drama/timecard';


// const docsProps = docsUtils.getModelDoc(PunchOutCdo);

export default {
  title: 'model/PunchOutModel',
  component: PunchOutCdo,
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
