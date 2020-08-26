
import React, { Component } from 'react';
import { withStory, SourceCodeViewer } from '@nara.platform/storybook';

import PunchOutModelCode from '!raw-loader!@nara.drama/timecard/model/punch/vo/PunchOutModel';
import docs from './docs';


export const basic = withStory(
  //
  class Story extends Component {
    //
    render() {
      //
      return (
        <SourceCodeViewer
          sourceCode={PunchOutModelCode}
        />
      );
    }
  },
);

basic.story = {
  name: 'basic',
};

export default {
  title: 'model/PunchOutModel',
  component: docs.component,
  parameters: { ...docs.parameters },
};
