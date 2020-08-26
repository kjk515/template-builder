
import React, { Component } from 'react';
import { withStory, SourceCodeViewer } from '@nara.platform/storybook';

import DailyPunchModelCode from '!raw-loader!@nara.drama/timecard/model/punch/vo/DailyPunchModel';
import docs from './docs';


export const basic = withStory(
  //
  class Story extends Component {
    //
    render() {
      //
      return (
        <SourceCodeViewer
          sourceCode={DailyPunchModelCode}
        />
      );
    }
  },
);

basic.story = {
  name: 'basic',
};

export default {
  title: 'model/DailyPunchModel',
  component: docs.component,
  parameters: { ...docs.parameters },
};
