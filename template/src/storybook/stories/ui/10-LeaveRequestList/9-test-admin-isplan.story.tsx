
import React from 'react';
import { withStory, storyLogger } from '@nara.platform/storybook';

import { LeaveRequest, LeaveRequestList, LeaveRequestListTypes, LeavePlanModel } from '@nara.drama/timecard';
import { Modal, SelectDatePicker, SelectDatePickerTypes } from '@nara.platform/react-ui';
import moment, { Moment } from 'moment';

import docs from './docs';
import { DefaultDataComponent } from '~/storybook/shared';


interface State {
  open: boolean;
  adjustmentOpen: boolean;
  date: Moment;
  leavePlanId?: string;
}

export const testAdminIsPlan = withStory(
  //
  class Story extends DefaultDataComponent {
    //
    // state: State = {
    //   open: false,
    //   adjustmentOpen: false,
    //   date: moment(),
    //   leavePlanId: '',
    // };

    onChangeDate(e: React.SyntheticEvent, params: SelectDatePickerTypes.DateParams) {
      //
      const date = moment(params.date);

      this.setState({ date });
    }

    onClickAdjustment(leavePlan: LeavePlanModel) {
      //
      storyLogger(LeaveRequestList, 'onClickAdjustment');
      this.setState({ adjustmentOpen: true, leavePlanId: leavePlan.id });
    }

    onClickColumn(params: LeaveRequestListTypes.ClickColumnParams) {
      //
      storyLogger(LeaveRequestList, 'onClickColumn', {
        params,
      });
      this.setState({ open: true, leavePlanId: params.leave.id });
    }

    onSuccessAdjustment() {
      //
      this.setState({ adjustmentOpen: false });
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
            <SelectDatePicker.Unit type={SelectDatePicker.DateUnitType.Month} max={moment().month()} />
          </SelectDatePicker>
          <hr />

          <LeaveRequestList
            isPlan
            projectId={projectId}
            date={this.state.date}
            onClickAdjustment={this.onClickAdjustment}
            onClickColumn={this.onClickColumn}
          >
            <LeaveRequestList.Content />
          </LeaveRequestList>
          <Modal
            open={this.state.adjustmentOpen}
            onClose={() => this.setState({ adjustmentOpen: false })}
            size="small"
            className="base"
          >
            <LeaveRequest
              projectId={projectId}
              leavePlanId={this.state.leavePlanId}
              editingAdjustment
            >
              <Modal.Header>
                조정 요청
              </Modal.Header>
              <Modal.Content>
                <LeaveRequest.Content />
              </Modal.Content>

              <Modal.Actions>
                <LeaveRequest.ActionButtons onSuccess={this.onSuccessAdjustment} />
                <Modal.CloseButton />
              </Modal.Actions>
            </LeaveRequest>
          </Modal>
          <Modal
            open={this.state.open}
            onClose={() => this.setState({ open: false })}
            size="small"
            className="base"
          >
            <LeaveRequest
              projectId={projectId}
              leavePlanId={this.state.leavePlanId}
            >
              <Modal.Header>
                휴가상세보기
              </Modal.Header>
              <Modal.Content>
                <LeaveRequest.Content />
              </Modal.Content>

              <Modal.Actions>
                <LeaveRequest.ActionButtons />
                <Modal.CloseButton>확인</Modal.CloseButton>
              </Modal.Actions>
            </LeaveRequest>
          </Modal>
        </>
      );
    }
  },
);

testAdminIsPlan.story = {
  name: 'testAdminIsPlan',
};

export default {
  title: 'component/LeaveRequestList',
  component: docs.component,
  subcomponents: docs.subcomponents,
  parameters: { ...docs.parameters },
};
