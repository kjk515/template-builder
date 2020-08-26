
import React, { Component } from 'react';
import { withStory, SourceCodeViewer } from '@nara.platform/storybook';

import ProjectDayModelCode from '!raw-loader!@nara.drama/timecard/model/punch/ProjectDayModel';
import docs from './docs';


export const basic = withStory(
  //
  class Story extends Component {
    //
    render() {
      //
      return (
        <SourceCodeViewer
          sourceCode={ProjectDayModelCode}
        />
      );
    }
  },
);

basic.story = {
  name: 'basic',
};

export default {
  title: 'model/ProjectDayModel',
  component: docs.component,
  parameters: { ...docs.parameters },
};
