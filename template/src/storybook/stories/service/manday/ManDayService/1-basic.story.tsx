
import React, { Component } from 'react';
import { withStory, SourceCodeViewer } from '@nara.platform/storybook';

import ManDayServiceCode from '!raw-loader!@nara.drama/timecard/service/punch/logic/ManDayService';
import docs from './docs';


export const basic = withStory(
  //
  class Story extends Component {
    //
    render() {
      //
      return (
        <SourceCodeViewer
          sourceCode={ManDayServiceCode}
        />
      );
    }
  },
);

basic.story = {
  name: 'basic',
};

export default {
  title: 'service/ManDayService',
  component: docs.component,
  parameters: { ...docs.parameters },
};
