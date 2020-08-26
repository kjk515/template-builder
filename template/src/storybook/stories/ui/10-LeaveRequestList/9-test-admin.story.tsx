
import React, { Component } from 'react';
import { withStory, storyLogger } from '@nara.platform/storybook';

import { LeaveChecker, LeaveRequestList, LeaveRequestListTypes } from '@nara.drama/timecard';
import { Modal, SelectDatePicker, SelectDatePickerTypes } from '@nara.platform/react-ui';
import moment, { Moment } from 'moment';

import docs from './docs';


interface State {
  open: boolean;
  date: Moment;
  leaveId: string;
}

export const testAdmin = withStory(
  //
  class Story extends Component {
    //
    state: State = {
      open: false,
      date: moment(),
      leaveId: '',
    };

    onChangeDate(e: React.SyntheticEvent, params: SelectDatePickerTypes.DateParams) {
      //
      const date = moment(params.date);

      this.setState({ date });
    }

    onClickColumn(params: LeaveRequestListTypes.ClickColumnParams) {
      //
      storyLogger(LeaveRequestList, 'onClickColumn', {
        params,
      });
      this.setState({ open: true, leaveId: params.leave.id });
    }


    render() {
      //
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
            date={this.state.date}
            onClickColumn={this.onClickColumn}
          >
            <LeaveRequestList.Content />
          </LeaveRequestList>
          <Modal
            open={this.state.open}
            onClose={() => this.setState({ open: false })}
            size="small"
            className="base"
          >
            <LeaveChecker
              leaveId={this.state.leaveId}
            >
              <Modal.Header>
                휴가상세보기
              </Modal.Header>
              <Modal.Content>
                <LeaveChecker.Content />
              </Modal.Content>

              <Modal.Actions>
                <Modal.CloseButton />
              </Modal.Actions>
            </LeaveChecker>
          </Modal>
        </>
      );
    }
  },
);

testAdmin.story = {
  name: 'testAdmin',
};

export default {
  title: 'component/LeaveRequestList',
  component: docs.component,
  subcomponents: docs.subcomponents,
  parameters: { ...docs.parameters },
};
