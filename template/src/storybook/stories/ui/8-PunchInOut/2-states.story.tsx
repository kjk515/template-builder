
import React, { Component } from 'react';
import { withStory, PanelGroup } from '@nara.platform/storybook';

import moment from 'moment';
import { dialog } from '@nara.platform/react-ui';
import { PunchInOut } from '@nara.drama/timecard';
import docs from './docs';


export const states = withStory(
  //
  class Story extends Component {
    //
    private today = moment();
    private yesterday = moment().subtract(1, 'd');

    onSuccessPunchIn(): void {
      //
      dialog.alert({
        title: '오늘도 즐거운 하루 되시기 바랍니다.',
        message: '오늘 하루도 즐거운 넥스트리안 되시기 바랍니다. 출근 처리 되었습니다.',
      });
    }

    onSuccessPunchOut(): void {
      //
      dialog.alert({
        title: '오늘 하루 수고하셨습니다.',
        message: '퇴근 처리 되었습니다.',
      });
    }

    onFail(): void {
      //
      dialog.alert({
        title: '오류가 발생하였습니다.',
        message: '다시 한 번 더 시도해 주시기 바랍니다.',
      });
    }

    render() {
      //
      return (
        <PanelGroup
          panels={[
            {
              title: '오늘 출/퇴근',
              component: (
                <PunchInOut date={this.today}>
                  <PunchInOut.Header
                    text={`안녕하세요! 홍길동님`}
                  />
                  <PunchInOut.Content />
                  <PunchInOut.ConfirmButton
                    onSuccessPunchOut={() => this.onSuccessPunchOut()}
                    onSuccessPunchIn={() => this.onSuccessPunchIn()}
                    onFail={() => this.onFail()}
                  />
                </PunchInOut>
              ),
            },
            {
              title: '지난날짜 출/퇴근',
              component: (
                <PunchInOut date={this.yesterday}>
                  <PunchInOut.Header
                    text={`안녕하세요! 홍길동님`}
                  />
                  <PunchInOut.Content />
                  <PunchInOut.ConfirmButton
                    onSuccessPunchOut={() => this.onSuccessPunchOut()}
                    onSuccessPunchIn={() => this.onSuccessPunchIn()}
                    onFail={() => this.onFail()}
                  />
                </PunchInOut>
              ),
            },
            {
              title: '출퇴근 상세보기',
              component: (
                <PunchInOut date={this.yesterday}>
                  <PunchInOut.Header
                    text={`안녕하세요! 홍길동님`}
                  />
                  <PunchInOut.Content history />
                </PunchInOut>
              ),
            },
          ]}
        />
      );
    }
  },
);

states.story = {
  name: 'states',
};

export default {
  title: 'component/PunchInOut',
  component: docs.component,
  subcomponents: docs.subcomponents,
  parameters: { ...docs.parameters },
};
