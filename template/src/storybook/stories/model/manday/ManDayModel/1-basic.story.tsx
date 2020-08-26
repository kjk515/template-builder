
import React, { Component } from 'react';
import { withStory, SourceCodeViewer } from '@nara.platform/storybook';

import ManDayModelCode from '!raw-loader!@nara.drama/timecard/model/punch/ManDayModel';
import docs from './docs';


export const basic = withStory(
  //
  class Story extends Component {
    //
    render() {
      //
      return (
        <SourceCodeViewer
          sourceCode={ManDayModelCode}
        />
      );
    }
  },
);

basic.story = {
  name: 'basic',
};

export default {
  title: 'model/ManDayModel',
  component: docs.component,
  parameters: { ...docs.parameters },
};
