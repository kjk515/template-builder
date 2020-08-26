
import React from 'react';
import { withStory, storyLogger } from '@nara.platform/storybook';

import { ProjectMonthlyLog, ProjectMonthlyLogTypes } from '@nara.drama/timecard';
import moment from 'moment';
import { SelectDatePicker, SelectDatePickerTypes } from '@nara.platform/react-ui';

import docs from './docs';
import { DefaultDataComponent } from '~/storybook/shared';


export const withChangeDate = withStory(
  //
  class Story extends DefaultDataComponent {
    //

    onChangeDate(e: React.SyntheticEvent, params: SelectDatePickerTypes.DateParams): void {
      //
      const date = moment(params.date);

      this.setState({ date });
    }

    onClickMemberName(params: ProjectMonthlyLogTypes.MemberParams): void {
      //
      storyLogger(ProjectMonthlyLog, 'onClickMemberName', {
        params,
      });
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

          <ProjectMonthlyLog
            projectId={this.getProjectId()}
            date={date}
          >
            <ProjectMonthlyLog.Header />
            <ProjectMonthlyLog.Content
              onClickMemberName={this.onClickMemberName}
            />
            <ProjectMonthlyLog.Footer />
          </ProjectMonthlyLog>
        </>
      );
    }
  },
);

withChangeDate.story = {
  name: 'withChangeDate',
};

export default {
  title: 'component/ProjectMonthlyLog',
  component: docs.component,
  subcomponents: docs.subcomponents,
  parameters: { ...docs.parameters },
};
