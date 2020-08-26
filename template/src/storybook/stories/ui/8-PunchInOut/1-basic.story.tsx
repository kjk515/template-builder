
import React, { Component } from 'react';
import { withStory, storyLogger } from '@nara.platform/storybook';

import { dialog } from '@nara.platform/react-ui';
import { PunchInOut } from '@nara.drama/timecard';
import docs from './docs';


export const basic = withStory(
  //
  class Story extends Component {
    //
    onClickViewTimeLine(): void {
      //
      storyLogger(PunchInOut, 'onClickViewTimeLine');
    }

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
        <PunchInOut>
          <PunchInOut.Header
            text={`홍길동`}
            onClickViewTimeLine={this.onClickViewTimeLine}
          />
          <PunchInOut.Content />
          <PunchInOut.ConfirmButton
            onSuccessPunchOut={() => this.onSuccessPunchOut()}
            onSuccessPunchIn={() => this.onSuccessPunchIn()}
            onFail={() => this.onFail()}
          />
        </PunchInOut>
      );
    }
  },
);

basic.story = {
  name: 'basic',
};

export default {
  title: 'component/PunchInOut',
  component: docs.component,
  subcomponents: docs.subcomponents,
  parameters: { ...docs.parameters },
};
