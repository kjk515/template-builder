
import React from 'react';
import { DocsPage } from '@nara.platform/storybook';

import { ManDayModel } from '@nara.drama/timecard';


// const docsProps = docsUtils.getModelDoc(ManDayModel);

export default {
  title: 'model/ManDayModel',
  component: ManDayModel,
  parameters: {
    docs: {
      page: () => (
        <DocsPage
          description="ManDay 컴포넌트의 뷰모델입니다."
          // props={docsProps}
        />
      ),
    },
  },
};
