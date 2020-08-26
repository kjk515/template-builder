
import React, { Component } from 'react';
import { withStory, SourceCodeViewer } from '@nara.platform/storybook';

import MemberModelCode from '!raw-loader!@nara.drama/timecard/model/project/MemberModel';
import docs from './docs';


export const basic = withStory(
  //
  class Story extends Component {
    //
    render() {
      //
      return (
        <SourceCodeViewer
          sourceCode={MemberModelCode}
        />
      );
    }
  },
);

basic.story = {
  name: 'basic',
};

export default {
  title: 'model/MemberModel',
  component: docs.component,
  parameters: { ...docs.parameters },
};
