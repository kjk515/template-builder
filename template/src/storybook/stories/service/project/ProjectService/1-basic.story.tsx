
import React, { Component } from 'react';
import { withStory, SourceCodeViewer } from '@nara.platform/storybook';

import ProjectServiceCode from '!raw-loader!@nara.drama/timecard/service/punch/logic/ProjectService';
import docs from './docs';


export const basic = withStory(
  //
  class Story extends Component {
    //
    render() {
      //
      return (
        <SourceCodeViewer
          sourceCode={ProjectServiceCode}
        />
      );
    }
  },
);

basic.story = {
  name: 'basic',
};

export default {
  title: 'service/ProjectService',
  component: docs.component,
  parameters: { ...docs.parameters },
};
