
import React, { Component } from 'react';
import { withStory, storyLogger } from '@nara.platform/storybook';

import { LeaveChecker, LeaveRequestList, LeaveRequestListTypes, LeaveSummary } from '@nara.drama/timecard';
import { Modal, SelectDatePicker, SelectDatePickerTypes } from '@nara.platform/react-ui';
import moment, { Moment } from 'moment';

import docs from './docs';


interface State {
  open: boolean;
  date: Moment;
  leaveId: string;
}

export const testMember = withStory(
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
          </SelectDatePicker>
          <hr />

          <LeaveSummary
            date={this.state.date}
            memberId="1c7543f8-72f3-45de-bfba-5817c111c207"
          />
          <LeaveRequestList
            projectId="1137981f-db9e-4221-823d-b166fc0fd9df"
            memberId="1c7543f8-72f3-45de-bfba-5817c111c207"
            date={this.state.date}
            onClickColumn={this.onClickColumn}
          >
            <LeaveRequestList.Header />
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
                <Modal.CloseButton>확인</Modal.CloseButton>
              </Modal.Actions>
            </LeaveChecker>
          </Modal>
        </>
      );
    }
  },
);

testMember.story = {
  name: 'testMember',
};

export default {
  title: 'component/LeaveRequestList',
  component: docs.component,
  subcomponents: docs.subcomponents,
  parameters: { ...docs.parameters },
};
