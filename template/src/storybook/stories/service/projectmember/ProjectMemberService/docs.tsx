
import React from 'react';
import { DocsPage } from '@nara.platform/storybook';

import { MemberService } from '@nara.drama/timecard';


// const docsProps = docsUtils.getModelDoc(MemberService);

export default {
  title: 'service/MemberService',
  component: MemberService,
  parameters: {
    docs: {
      page: () => (
        <DocsPage
          description="memberService 입니다."
          // props={docsProps}
        />
      ),
    },
  },
};
