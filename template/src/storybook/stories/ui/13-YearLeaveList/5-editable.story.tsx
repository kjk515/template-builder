
import React, { Component } from 'react';
import { withStory, storyLogger } from '@nara.platform/storybook';

import { YearLeaveList } from '@nara.drama/timecard';
import docs from './docs';


interface State {
  editable: boolean;
}

export const editable = withStory(
  //
  class Story extends Component {
    //
    state: State = {
      editable: false,
    };


    onChangeEditable(editable: boolean) {
      //
      this.setState({ editable });
      storyLogger('YearLeaveList.EditButton', 'onChangeEditable');
    }

    render() {
      //
      const { editable } = this.state;

      return (
        <>
          <YearLeaveList.EditButton
            editable={editable}
            onChangeEditable={this.onChangeEditable}
          />
          <YearLeaveList
            projectId="cb1be048-2530-4f80-88f4-1451e22f5619"
            editable={editable}
          >
            <YearLeaveList.Content />
          </YearLeaveList>
        </>
      );
    }
  },
);

editable.story = {
  name: 'editable',
};

export default {
  title: 'component/YearLeaveList',
  component: docs.component,
  subcomponents: docs.subcomponents,
  parameters: { ...docs.parameters },
};
