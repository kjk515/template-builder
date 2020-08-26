
import React from 'react';
import { withStory, storyLogger } from '@nara.platform/storybook';

import { LeaveChecker } from '@nara.drama/timecard';
import { Button, Modal, ModalContextProps } from '@nara.platform/react-ui';
import { DefaultDataComponent } from '~/storybook/shared';
import docs from './docs';


export const withModal = withStory(
  //
  class Story extends DefaultDataComponent {
    //
    onSuccess(close: () => void) {
      //
      storyLogger(LeaveChecker, '휴가완료');
      close();
    }

    render() {
      //
      const leaveId = this.getFirstLeaveId();

      if (!leaveId) {
        return null;
      }

      return (
        <Modal
          size="small"
          className="base"
          trigger={<Button primary size="tiny">휴가보기</Button>}
        >
          {(context: ModalContextProps) => (
            <LeaveChecker
              leaveId={leaveId}
            >
              <Modal.Header>
                휴가
              </Modal.Header>
              <Modal.Content>
                <LeaveChecker.Content />
              </Modal.Content>

              <Modal.Actions>

                <Modal.CloseButton />
                <LeaveChecker.ActionButtons
                  onSuccess={() => this.onSuccess(context.close)}
                />
              </Modal.Actions>
            </LeaveChecker>
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
  title: 'component/LeaveChecker',
  component: docs.component,
  subcomponents: docs.subcomponents,
  parameters: { ...docs.parameters },
};
