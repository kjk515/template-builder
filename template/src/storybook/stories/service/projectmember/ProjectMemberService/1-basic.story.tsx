
import React, { Component } from 'react';
import { withStory, SourceCodeViewer } from '@nara.platform/storybook';

import MemberServiceCode from '!raw-loader!@nara.drama/timecard/service/punch/logic/MemberService';
import docs from './docs';


export const basic = withStory(
  //
  class Story extends Component {
    //
    render() {
      //
      return (
        <SourceCodeViewer
          sourceCode={MemberServiceCode}
        />
      );
    }
  },
);

basic.story = {
  name: 'basic',
};

export default {
  title: 'service/MemberService',
  component: docs.component,
  parameters: { ...docs.parameters },
};
