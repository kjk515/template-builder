
import React from 'react';
import { DocsPage } from '@nara.platform/storybook';

import { MemberModel } from '@nara.drama/timecard';


// const docsProps = docsUtils.getModelDoc(MemberModel);

export default {
  title: 'model/MemberModel',
  component: MemberModel,
  parameters: {
    docs: {
      page: () => (
        <DocsPage
          description="Member 뷰모델입니다."
          // props={docsProps}
        />
      ),
    },
  },
};
