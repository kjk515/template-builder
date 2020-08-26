
import React, { Component } from 'react';
import { withStory } from '@nara.platform/storybook';

import moment, { Moment } from 'moment';
import { SelectDatePicker, SelectDatePickerTypes, Button, Form } from '@nara.platform/react-ui';
import { MemberMonthlyPunchTimeline } from '@nara.drama/timecard';

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

    onClickButton() {
      //
      this.setState({
        date: moment(),
      });
    }

    render() {
      //
      const { date } = this.state;
      const projectId = '95409b74-0504-4e47-ac5d-25269ebc2d7c';

      // FIXME: by hkkang - 특정 날짜로 지정하여 컴포넌트 기본 상태(잘 나오는)를 보여줄 수 있도록 구성
      return (
        <>
          <SelectDatePicker
            onChange={this.onChangeDate}
          >
            <Form>
              <Form.Group inline>
                <SelectDatePicker.Unit type={SelectDatePicker.DateUnitType.Year} min={2020} />
                <SelectDatePicker.Unit type={SelectDatePicker.DateUnitType.Month} max={moment().month()} />
              </Form.Group>
            </Form>
          </SelectDatePicker>
          <Button primary size="tiny" onClick={this.onClickButton}>이번달 적용</Button>
          <hr />

          <MemberMonthlyPunchTimeline
            personal
            projectId={projectId}
            yearMonth={date}
          >
            <MemberMonthlyPunchTimeline.Content />
          </MemberMonthlyPunchTimeline>
        </>
      );
    }
  },
);

withChangeDate.story = {
  name: 'withChangeDate',
};

export default {
  title: 'component/MemberMonthlyPunchTimeline',
  component: docs.component,
  subcomponents: docs.subcomponents,
  parameters: { ...docs.parameters },
};
