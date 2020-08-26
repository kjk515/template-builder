
import React, { Component } from 'react';
import { withStory, SourceCodeViewer } from '@nara.platform/storybook';

import DayOnModelCode from '!raw-loader!@nara.drama/timecard/model/punch/vo/DayOnModel';
import docs from './docs';


export const basic = withStory(
  //
  class Story extends Component {
    //
    render() {
      //
      return (
        <SourceCodeViewer
          sourceCode={DayOnModelCode}
        />
      );
    }
  },
);

basic.story = {
  name: 'basic',
};

export default {
  title: 'model/DayOnModel',
  component: docs.component,
  parameters: { ...docs.parameters },
};
