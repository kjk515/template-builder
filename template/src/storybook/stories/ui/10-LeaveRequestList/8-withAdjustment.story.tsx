
import React from 'react';
import { withStory, storyLogger } from '@nara.platform/storybook';

import { LeaveRequest, LeaveRequestList } from '@nara.drama/timecard';
import { Modal, ModalContextProps } from '@nara.platform/react-ui';
import moment from 'moment';

import { DefaultDataComponent } from '~/storybook/shared';
import docs from './docs';
import { LeaveModel, LeavePlanModel } from '~/lib/model';


export const withAdjustment = withStory(
  //
  class Story extends DefaultDataComponent {
    //
    state = {
      projectId: '',
      leavePlanIds: [],
      leaveIds: [],
      open: false,
      leavePlanId: '',
    };


    onClickAdjustment(leave: LeaveModel | LeavePlanModel) {
      //
      storyLogger(LeaveRequestList, 'onClickAdjustment');
      this.setState({
        open: true,
        leavePlanId: leave.id,
      });
    }

    render() {
      //
      const projectId = this.getProjectId();
      const { leavePlanId } = this.state;

      if (!projectId) {
        return null;
      }

      return (
        <>
          <LeaveRequestList
            isPlan
            projectId={projectId}
            date={moment()}
            onClickAdjustment={this.onClickAdjustment}
          >
            <LeaveRequestList.Content />
          </LeaveRequestList>

          <Modal
            open={this.state.open}
            onClose={() => this.setState({ open: false })}
            size="small"
            className="base"
          >
            {(context: ModalContextProps) => (
              <LeaveRequest
                projectId={projectId}
                leavePlanId={leavePlanId}
              >
                <Modal.Header>
                  조정 요청
                </Modal.Header>
                <Modal.Content>
                  <LeaveRequest.Content />
                </Modal.Content>

                <Modal.Actions>
                  <Modal.CloseButton />
                  <LeaveRequest.ActionButtons />
                </Modal.Actions>
              </LeaveRequest>
            )}
          </Modal>
        </>
      );
    }
  },
);

withAdjustment.story = {
  name: 'withAdjustment',
};

export default {
  title: 'component/LeaveRequestList',
  component: docs.component,
  subcomponents: docs.subcomponents,
  parameters: { ...docs.parameters },
};
