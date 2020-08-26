
import React from 'react';
import { withStory } from '@nara.platform/storybook';

import { ProjectMonthlyLeaveLog } from '@nara.drama/timecard';
import moment from 'moment';
import { SelectDatePicker, SelectDatePickerTypes } from '@nara.platform/react-ui';

import docs from './docs';
import { DefaultDataComponent } from '~/storybook/shared';


export const withChangeDate = withStory(
  //
  class Story extends DefaultDataComponent {
    //
    // state = {
    //   date: moment(),
    // };

    onChangeDate(e: React.SyntheticEvent, params: SelectDatePickerTypes.DateParams): void {
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
          <ProjectMonthlyLeaveLog
            projectId={this.getProjectId()}
            date={date}
          >
            <ProjectMonthlyLeaveLog.Header />
            <ProjectMonthlyLeaveLog.Content />
            <ProjectMonthlyLeaveLog.Footer />
          </ProjectMonthlyLeaveLog>
        </>
      );
    }
  },
);

withChangeDate.story = {
  name: 'withChangeDate',
};

export default {
  title: 'component/ProjectMonthlyLeaveLog',
  component: docs.component,
  subcomponents: docs.subcomponents,
  parameters: { ...docs.parameters },
};
