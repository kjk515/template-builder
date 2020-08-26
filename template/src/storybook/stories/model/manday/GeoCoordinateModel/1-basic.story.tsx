
import React, { Component } from 'react';
import { withStory, SourceCodeViewer } from '@nara.platform/storybook';

import GeoCoordinateModelCode from '!raw-loader!@nara.drama/timecard/model/punch/vo/GeoCoordinateModel';
import docs from './docs';


export const basic = withStory(
  //
  class Story extends Component {
    //
    render() {
      //
      return (
        <SourceCodeViewer
          sourceCode={GeoCoordinateModelCode}
        />
      );
    }
  },
);

basic.story = {
  name: 'basic',
};

export default {
  title: 'model/GeoCoordinateModel',
  component: docs.component,
  parameters: { ...docs.parameters },
};
