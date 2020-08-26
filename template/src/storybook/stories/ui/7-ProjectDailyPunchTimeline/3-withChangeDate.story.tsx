
import React from 'react';
import { withStory } from '@nara.platform/storybook';

import { ProjectDailyPunchTimeline } from '@nara.drama/timecard';
import moment from 'moment';
import { SelectDatePicker, SelectDatePickerTypes } from '@nara.platform/react-ui';
import docs from './docs';
import { DefaultDataComponent } from '~/storybook/shared';


export const withChangeDate = withStory(
  //
  class Story extends DefaultDataComponent {
    //
    state = {
      projectId: '',
      leavePlanIds: [],
      leaveIds: [],
      date: moment(),
    };


    onChangeDate(e: React.SyntheticEvent, params: SelectDatePickerTypes.DateParams): void {
      //
      const date = moment(params.date);
      const startOfMonth = date.startOf('month');

      this.setState({ date: startOfMonth });
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

          <ProjectDailyPunchTimeline
            projectId={this.getProjectId()}
            date={date}
          >
            <ProjectDailyPunchTimeline.Header />
            <ProjectDailyPunchTimeline.Content />
            <ProjectDailyPunchTimeline.Footer />
          </ProjectDailyPunchTimeline>
        </>
      );
    }
  },
);

withChangeDate.story = {
  name: 'withChangeDate',
};

export default {
  title: 'component/ProjectDailyPunchTimeline',
  component: docs.component,
  subcomponents: docs.subcomponents,
  parameters: { ...docs.parameters },
};
