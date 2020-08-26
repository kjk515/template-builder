
import React, { Component } from 'react';
import { withStory, storyLogger } from '@nara.platform/storybook';

import { YearLeaveList, YearLeaveRequestListTypes } from '@nara.drama/timecard';
import { SelectDatePicker, SelectDatePickerTypes } from '@nara.platform/react-ui';
import moment, { Moment } from 'moment';
import docs from './docs';


interface State {
  date?: Moment;
  editable: boolean;
}

export const test = withStory(
  //
  class Story extends Component {
    //
    state: State = {
      date: moment(),
      editable: false,
    };

    onChangeDate(e: React.SyntheticEvent, params: SelectDatePickerTypes.DateParams) {
      //
      const date = moment(params.date);

      this.setState({ date });
    }

    onChangeEditable(editable: boolean) {
      //
      this.setState({ editable });
      storyLogger('YearLeaveList.EditButton', 'onChangeEditable');
    }

    onClickColumn(params: YearLeaveRequestListTypes.ClickColumnParams) {
      //
      storyLogger(YearLeaveList, 'onClickColumn', {
        params,
      });
    }

    render() {
      //
      const { editable } = this.state;

      return (
        <>
          <SelectDatePicker
            onChange={this.onChangeDate}
          >
            <SelectDatePicker.Unit type={SelectDatePicker.DateUnitType.Year} min={2020} />
            <SelectDatePicker.Unit type={SelectDatePicker.DateUnitType.Month} max={moment().month()} />
          </SelectDatePicker>
          <YearLeaveList.EditButton
            editable={editable}
            onChangeEditable={this.onChangeEditable}
          />
          <hr />

          <YearLeaveList
            projectId="1137981f-db9e-4221-823d-b166fc0fd9df"
            editable={editable}
            date={this.state.date}
            onClickColumn={this.onClickColumn}
          >
            <YearLeaveList.Header />
            <YearLeaveList.Content />
          </YearLeaveList>
        </>
      );
    }
  },
);

test.story = {
  name: 'test',
};

export default {
  title: 'component/YearLeaveList',
  component: docs.component,
  subcomponents: docs.subcomponents,
  parameters: { ...docs.parameters },
};
