
import React, { Component } from 'react';
import { withStory } from '@nara.platform/storybook';

import { LeaveRequestList } from '@nara.drama/timecard';
import { SelectDatePicker, SelectDatePickerTypes } from '@nara.platform/react-ui';
import moment, { Moment } from 'moment';
import docs from './docs';


interface State {
  date: Moment;
}

export const withChangeDate = withStory(
  //
  class Story extends Component<{}, State> {
    //
    state: State = {
      date: moment(),
    };


    onChangeDate(e: React.SyntheticEvent, params: SelectDatePickerTypes.DateParams) {
      //
      const date = moment(params.date);

      this.setState({ date });
    }

    render() {
      //
      const { date } = this.state;

      return (
        <>
          <SelectDatePicker
            onChange={this.onChangeDate}
          >
            <SelectDatePicker.Unit type={SelectDatePicker.DateUnitType.Year} min={2020} />
            <SelectDatePicker.Unit type={SelectDatePicker.DateUnitType.Month} max={moment().month()} />
          </SelectDatePicker>
          <hr />

          <LeaveRequestList
            projectId="1137981f-db9e-4221-823d-b166fc0fd9df"
            personal={false}
            date={date}
          >
            <LeaveRequestList.Content />
          </LeaveRequestList>
        </>
      );
    }
  },
);

withChangeDate.story = {
  name: 'withChangeDate',
};

export default {
  title: 'component/LeaveRequestList',
  component: docs.component,
  subcomponents: docs.subcomponents,
  parameters: { ...docs.parameters },
};
