
import React from 'react';
import { ReactComponent, autobind, injectFromName, NaraService } from '@nara.platform/accent';
import { observer } from 'mobx-react';
import { withStory, storyLogger } from '@nara.platform/storybook';

import { PunchInOut } from '@nara.drama/timecard';
import moment from 'moment';
import { ModalContextProps, Modal, Button, Radio, Divider, dialog } from '@nara.platform/react-ui';

import docs from './docs';
import DataHandling from '../1-InitializeData/DataHandling';


interface InjectedProps {
  naraService: NaraService;
}


export const withModal = withStory(() => {
  //
  @injectFromName(NaraService.serviceName)
  @autobind
  @observer
  class Story extends ReactComponent<{}, {}, InjectedProps> {
    //
    private today = moment();
    private yesterday = moment().subtract(1, 'd');

    state = {
      isToday: true,
    };

    onClickViewTimeLine(close: () => void): void {
      //
      storyLogger(PunchInOut, '나의 출퇴근 기록보기 클릭');
      close();
    }

    onSuccessPunchIn(close: () => void): void {
      //
      dialog.alert({
        title: '오늘도 즐거운 하루 되시기 바랍니다.',
        message: '오늘 하루도 즐거운 넥스트리안 되시기 바랍니다. 출근 처리 되었습니다.',
      }).then(() => {
        close();
      });
    }

    onSuccessPunchOut(close: () => void): void {
      //
      dialog.alert({
        title: '오늘 하루 수고하셨습니다.',
        message: '퇴근 처리 되었습니다.',
      }).then(() => {
        close();
      });
    }

    onFail(close: () => void): void {
      //
      dialog.alert({
        title: '오류가 발생하였습니다.',
        message: '다시 한 번 더 시도해 주시기 바랍니다.',
      }).then(() => {
        close();
      });
    }

    render() {
      //
      const { patronName } = this.injected.naraService;
      const { isToday } = this.state;
      return (
        <>
          <DataHandling />
          <Radio name={'day'} checked={isToday} label={'오늘 날짜 펀치'} onChange={() => this.setState({ isToday: true })} />
          <Radio name={'day'} checked={!isToday} label={'어제 날짜 펀치'} onChange={() => this.setState({ isToday: false })} />
          <Divider />
          <Modal
            size="small"
            className="base"
            trigger={<Button primary size="tiny">출/퇴근</Button>}
          >
            {(context: ModalContextProps) => (
              <PunchInOut date={isToday ? this.today : this.yesterday}>
                <Modal.Header>
                  <h3 style={{ margin: 0 }}>{'출/퇴근'}</h3>
                  <h5 style={{ margin: 0 }}>{isToday ? this.today.format('YYYY.MM.DD (dd요일)') : this.yesterday.format('YYYY.MM.DD (dd요일)')}</h5>
                </Modal.Header>
                <Modal.Content>
                  <div className="simple">
                    <PunchInOut.Header
                      text={`안녕하세요! ${patronName}님`}
                      onClickViewTimeLine={() => this.onClickViewTimeLine(context.close)}
                    />
                    <PunchInOut.Content />
                  </div>
                </Modal.Content>
                <Modal.Actions>
                  <Modal.CloseButton />
                  <PunchInOut.ConfirmButton
                    onSuccessPunchOut={() => this.onSuccessPunchOut(context.close)}
                    onSuccessPunchIn={() => this.onSuccessPunchIn(context.close)}
                    onFail={() => this.onFail(context.close)}
                  />
                </Modal.Actions>
              </PunchInOut>
            )}
          </Modal>
          <Modal
            size="small"
            className="base"
            trigger={<Button primary size="tiny">출/퇴근 상세</Button>}
          >
            {(context: ModalContextProps) => (
              <PunchInOut date={isToday ? this.today : this.yesterday}>
                <Modal.Header>
                  <h3 style={{ margin: 0 }}>{'출/퇴근'}</h3>
                  <h5 style={{ margin: 0 }}>{isToday ? this.today.format('YYYY.MM.DD (dd요일)') : this.yesterday.format('YYYY.MM.DD (dd요일)')}</h5>
                </Modal.Header>
                <Modal.Content>
                  <div className="simple">
                    <PunchInOut.Header
                      text={`안녕하세요! ${patronName}님`}
                      onClickViewTimeLine={() => this.onClickViewTimeLine(context.close)}
                    />
                    <PunchInOut.Content history />
                  </div>
                </Modal.Content>
                <Modal.Actions>
                  <Modal.CloseButton>
                    {'닫기'}
                  </Modal.CloseButton>
                </Modal.Actions>
              </PunchInOut>
            )}
          </Modal>
        </>
      );
    }
  }

  return Story;
});

withModal.story = {
  name: 'withModal',
};

export default {
  title: 'component/PunchInOut',
  component: docs.component,
  subcomponents: docs.subcomponents,
  parameters: { ...docs.parameters },
};
