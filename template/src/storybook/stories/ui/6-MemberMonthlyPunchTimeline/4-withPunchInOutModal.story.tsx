
import React, { Component } from 'react';
import { ReactComponent, autobind, injectFromName, NaraService } from '@nara.platform/accent';
import { observer } from 'mobx-react';
import { withStory } from '@nara.platform/storybook';

import moment, { Moment } from 'moment';
import { Modal } from '@nara.platform/react-ui';
import { MemberMonthlyPunchTimeline, PunchInOut, MemberMonthlyPunchTimelineTypes } from '@nara.drama/timecard';

import docs from './docs';


interface ModalProps {
  open: boolean;
  date: Moment;
  manDayId: string;
  readOnly: boolean;
  onClose: () => void;
}

interface InjectedProps {
  naraService: NaraService;
}

interface State {
  open: boolean;
  date: Moment;
  manDayId: string;
  readOnly: boolean;
}

export const withPunchInOutModal = withStory(() => {
  //
  @injectFromName(NaraService.serviceName)
  @autobind
  @observer
  class PunchInOutModal extends ReactComponent<ModalProps, {}, InjectedProps> {
    //
    onSuccess(): void {
      //
      const { onClose } = this.props;

      onClose();
    }

    render() {
      //
      const { open, date, manDayId, readOnly, onClose } = this.props;
      const { patronName } = this.injected.naraService;

      return (
        <Modal
          size="small"
          className="base"
          open={open}
          onClose={onClose}
        >
          <Modal.Header>
            Punch In/Out
            <p>{date.format('YYYY.MM.DD')}</p>
          </Modal.Header>
          <PunchInOut manDayId={manDayId}>
            <Modal.Content>
              <div className="simple">
                <PunchInOut.Header
                  text={patronName}
                />
                <PunchInOut.Content />
              </div>
            </Modal.Content>
            <Modal.Actions>
              { readOnly ?
                <Modal.CloseButton>확인</Modal.CloseButton>
                :
                <>
                  <Modal.CloseButton>취소</Modal.CloseButton>
                  <PunchInOut.ConfirmButton onSuccessPunchIn={this.onSuccess} onSuccessPunchOut={this.onSuccess} />
                </>
              }
            </Modal.Actions>
          </PunchInOut>
        </Modal>
      );
    }
  }

  return class Story extends Component<{}, State> {
    //
    state: State = {
      open: false,
      date: moment(),
      manDayId: '',
      readOnly: false,
    };


    onClickPunchInOutTime(params: MemberMonthlyPunchTimelineTypes.PunchParams) {
      //
      this.setState({
        open: true,
        readOnly: true,
        manDayId: params.manDayId,
        date: params.date,
      });
    }

    onClickPunchOut(params: MemberMonthlyPunchTimelineTypes.PunchParams) {
      //
      this.setState({
        open: true,
        readOnly: false,
        manDayId: '',
        date: params.date,
      });
    }

    onClose() {
      //
      this.setState({ open: false });
    }

    render() {
      //
      const { open, date, readOnly, manDayId } = this.state;

      return (
        <>
          <MemberMonthlyPunchTimeline
            personal
            projectId="854bbf46-3bf1-47e6-9f23-029cab13b1f5"
          >
            <MemberMonthlyPunchTimeline.Content
              onClickPunchInOutTime={this.onClickPunchInOutTime}
            />
          </MemberMonthlyPunchTimeline>

          <PunchInOutModal
            open={open}
            date={date}
            readOnly={readOnly}
            manDayId={manDayId}
            onClose={this.onClose}
          />
        </>
      );
    }
  };
});

withPunchInOutModal.story = {
  name: 'withPunchInOutModal',
};

export default {
  title: 'component/MemberMonthlyPunchTimeline',
  component: docs.component,
  subcomponents: docs.subcomponents,
  parameters: { ...docs.parameters },
};
