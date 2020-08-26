
import React, { Component } from 'react';
import { withStory } from '@nara.platform/storybook';

import { DailyLog } from '@nara.drama/timecard';
import moment, { Moment } from 'moment';
import DatePicker from 'react-datepicker';
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


    onChangeDate(date: Moment): void {
      //
      this.setState({ date });
    }

    render() {
      //
      const { date } = this.state;
      return (
        <>
          <DatePicker
            placeholderText="날짜를 선택해주세요."
            dateFormat="yyyy.MM.dd"
            selected={date.toDate()}
            onChange={(date: Date) => this.onChangeDate(moment(date))}
          />
          <hr />
          <DailyLog date={date}>
            <DailyLog.Header />
            <DailyLog.DayOffContent />
          </DailyLog>
        </>
      );
    }
  },
);

withChangeDate.story = {
  name: 'withChangeDate',
};

export default {
  title: 'component/DailyLog',
  component: docs.component,
  subcomponents: docs.subcomponents,
  parameters: { ...docs.parameters },
};
