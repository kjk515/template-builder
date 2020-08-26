
import React from 'react';
import { withStory, storyLogger } from '@nara.platform/storybook';

import { LeaveChecker, LeaveRequestList, LeaveRequestListTypes } from '@nara.drama/timecard';
import { Modal, SelectDatePicker, SelectDatePickerTypes } from '@nara.platform/react-ui';
import moment, { Moment } from 'moment';

import docs from './docs';
import { DefaultDataComponent } from '~/storybook/shared';


interface State {
  open: boolean;
  date: Moment;
  leaveId: string;
}

export const testPersonal = withStory(
  //
  class Story extends DefaultDataComponent {
    //
    // state: State = {
    //   open: false,
    //   date: moment(),
    //   leaveId: '',
    // };

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
      const projectId = this.getProjectId();


      return (
        <>
          <SelectDatePicker
            onChange={this.onChangeDate}
          >
            <SelectDatePicker.Unit type={SelectDatePicker.DateUnitType.Year} min={2020} />
          </SelectDatePicker>
          <hr />

          <LeaveRequestList
            projectId={projectId}
            personal
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
                <LeaveChecker.ActionButtons />
                <Modal.CloseButton>확인</Modal.CloseButton>
              </Modal.Actions>
            </LeaveChecker>
          </Modal>
        </>
      );
    }
  },
);

testPersonal.story = {
  name: 'testPersonal',
};

export default {
  title: 'component/LeaveRequestList',
  component: docs.component,
  subcomponents: docs.subcomponents,
  parameters: { ...docs.parameters },
};
