
import React from 'react';
import { DocsPage } from '@nara.platform/storybook';

import { PunchInCdo } from '@nara.drama/timecard';


// const docsProps = docsUtils.getModelDoc(PunchInCdo);

export default {
  title: 'model/PunchInModel',
  component: PunchInCdo,
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
