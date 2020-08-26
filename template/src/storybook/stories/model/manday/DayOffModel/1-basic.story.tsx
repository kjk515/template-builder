
import React, { Component } from 'react';
import { withStory, SourceCodeViewer } from '@nara.platform/storybook';

import DayOffModelCode from '!raw-loader!@nara.drama/timecard/model/punch/vo/DayOffModel';
import docs from './docs';


export const basic = withStory(
  //
  class Story extends Component {
    //
    render() {
      //
      return (
        <SourceCodeViewer
          sourceCode={DayOffModelCode}
        />
      );
    }
  },
);

basic.story = {
  name: 'basic',
};

export default {
  title: 'model/DayOffModel',
  component: docs.component,
  parameters: { ...docs.parameters },
};
