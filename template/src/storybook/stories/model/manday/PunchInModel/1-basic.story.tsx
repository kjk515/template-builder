
import React, { Component } from 'react';
import { withStory, SourceCodeViewer } from '@nara.platform/storybook';

import PunchInModelCode from '!raw-loader!@nara.drama/timecard/model/punch/vo/PunchInModel';
import docs from './docs';


export const basic = withStory(
  //
  class Story extends Component {
    //
    render() {
      //
      return (
        <SourceCodeViewer
          sourceCode={PunchInModelCode}
        />
      );
    }
  },
);

basic.story = {
  name: 'basic',
};

export default {
  title: 'model/PunchInModel',
  component: docs.component,
  parameters: { ...docs.parameters },
};
