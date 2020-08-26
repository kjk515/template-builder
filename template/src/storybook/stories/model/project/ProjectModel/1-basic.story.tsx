
import React, { Component } from 'react';
import { withStory, SourceCodeViewer } from '@nara.platform/storybook';

import ProjectModelCode from '!raw-loader!@nara.drama/timecard/model/project/ProjectModel';
import docs from './docs';


export const basic = withStory(
  //
  class Story extends Component {
    //
    render() {
      //
      return (
        <SourceCodeViewer
          sourceCode={ProjectModelCode}
        />
      );
    }
  },
);

basic.story = {
  name: 'basic',
};

export default {
  title: 'model/ProjectModel',
  component: docs.component,
  parameters: { ...docs.parameters },
};
