
import React from 'react';
import { DocsPage } from '@nara.platform/storybook';
import { DailyPunchModel } from '@nara.drama/timecard';


// const docsProps = docsUtils.getModelDoc(DailyPunchModel);

export default {
  title: 'model/DailyPunchModel',
  component: DailyPunchModel,
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
