
import React, { Component } from 'react';
import { withStory } from '@nara.platform/storybook';

import docs from './docs';
import DataHandling from './DataHandling';


export const basic = withStory(
  //
  class Story extends Component {
    //
    render() {
      //
      return (
        <DataHandling />
      );
    }
  },
);

basic.story = {
  name: 'basic',
};

export default {
  title: 'component/InitializeData',
  component: docs.component,
  subcomponents: docs.subcomponents,
  parameters: { ...docs.parameters },
};
