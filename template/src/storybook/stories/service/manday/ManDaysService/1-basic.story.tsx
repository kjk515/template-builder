
import React, { Component } from 'react';
import { withStory, SourceCodeViewer } from '@nara.platform/storybook';

import ManDaysServiceCode from '!raw-loader!@nara.drama/timecard/service/punch/logic/ManDaysService';
import docs from './docs';


export const basic = withStory(
  //
  class Story extends Component {
    //
    render() {
      //
      return (
        <SourceCodeViewer
          sourceCode={ManDaysServiceCode}
        />
      );
    }
  },
);

basic.story = {
  name: 'basic',
};

export default {
  title: 'service/ManDaysService',
  component: docs.component,
  parameters: { ...docs.parameters },
};
