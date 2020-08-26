
import React from 'react';
import { withStory, storyLogger } from '@nara.platform/storybook';
import {
  LeaveRequest,
  LeaveRequestList,
  LeaveRequestListTypes,
} from '@nara.drama/timecard';
import { Modal, SelectDatePicker, SelectDatePickerTypes } from '@nara.platform/react-ui';
import moment from 'moment';

import docs from './docs';
import { DefaultDataComponent } from '~/storybook/shared';


export const testPersonalIsPlan = withStory(
  //
  class Story extends DefaultDataComponent {
    //
    state = {
      projectId: '',
      leavePlanIds: [],
      leaveIds: [],
      open: false,
      adjustmentOpen: false,
      date: moment(),
      leavePlanId: '',
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
      this.setState({ open: true, leavePlanId: params.leave.id });
    }

    render() {
      //
      const projectId = this.getProjectId();

      if (!projectId) {
        return null;
      }

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
            date={this.state.date}
            isPlan
            personal
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
            <LeaveRequest
              projectId="1137981f-db9e-4221-823d-b166fc0fd9df"
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

testPersonalIsPlan.story = {
  name: 'testPersonalIsPlan',
};

export default {
  title: 'component/LeaveRequestList',
  component: docs.component,
  subcomponents: docs.subcomponents,
  parameters: { ...docs.parameters },
};
