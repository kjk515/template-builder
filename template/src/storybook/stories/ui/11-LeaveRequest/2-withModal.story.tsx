
import React from 'react';
import { withStory, storyLogger } from '@nara.platform/storybook';

import { LeaveRequest } from '@nara.drama/timecard';
import { Button, Modal, ModalContextProps } from '@nara.platform/react-ui';
import { DefaultDataComponent } from '~/storybook/shared';
import docs from './docs';


export const withModal = withStory(
  //
  class Story extends DefaultDataComponent {
    //
    onSuccess(close: () => void) {
      //
      storyLogger(LeaveRequest, '휴가신청(변경) 완료');
      close();
    }

    onCancel(close: () => void) {
      //
      storyLogger(LeaveRequest, '휴가신청 취소 완료');
      close();
    }

    render() {
      //
      const projectId = this.getProjectId();

      if (!projectId) {
        return null;
      }

      return (
        <Modal
          size="small"
          className="base"
          trigger={<Button primary size="tiny">휴가 신청하기</Button>}
        >
          {(context: ModalContextProps) => (
            <LeaveRequest
              projectId={projectId}
            >
              <Modal.Header>
                휴가 신청
              </Modal.Header>
              <Modal.Content>
                <LeaveRequest.Content />
              </Modal.Content>

              <Modal.Actions>
                <Modal.CloseButton />
                <LeaveRequest.ActionButtons
                  onSuccess={() => this.onSuccess(context.close)}
                  onCancel={() => this.onCancel(context.close)}
                />
              </Modal.Actions>
            </LeaveRequest>
          )}
        </Modal>
      );
    }
  },
);

withModal.story = {
  name: 'withModal',
};

export default {
  title: 'component/LeaveRequest',
  component: docs.component,
  subcomponents: docs.subcomponents,
  parameters: { ...docs.parameters },
};
