import React, { Component } from 'react';
import { withStory } from '@nara.platform/storybook';

import { DailyLog } from '@nara.drama/timecard';
import { Button, Modal } from '@nara.platform/react-ui';
import moment from 'moment';
import docs from './docs';


export const withModal = withStory(
  //
  class Story extends Component {
    //
    private basicStateDate = moment('2020-07-28');    // 테스트 데이터 (휴가, 휴가/상세)
    private today = moment();   // today


    render() {
      //
      return (
        <>
          <Modal
            size="tiny"
            className="base"
            trigger={<Button primary size="tiny">Today</Button>}
          >
            <DailyLog date={this.basicStateDate}>
              <Modal.Header>
                <h3 style={{ margin: 0 }}>{moment(this.basicStateDate).format('YYYY.MM.DD (dd요일)')}</h3>
                {/*<DailyLog.Header />*/}
              </Modal.Header>
              <Modal.Content>
                <div className="time-sequence">
                  <DailyLog.Header />
                  <DailyLog.DayOffContent />
                </div>
              </Modal.Content>

              <Modal.Actions>
                <Modal.CloseButton>
                  {'확인'}
                </Modal.CloseButton>
              </Modal.Actions>
            </DailyLog>
          </Modal>
          <Modal
            size="tiny"
            className="base"
            trigger={<Button primary size="tiny">Today-Detail</Button>}
          >
            <DailyLog date={this.basicStateDate}>
              <Modal.Header>
                <h3 style={{ margin: 0 }}>{moment(this.basicStateDate).format('YYYY.MM.DD (dd요일)')}</h3>
              </Modal.Header>
              <Modal.Content>
                <div className="time-sequence">
                  <DailyLog.Header />
                  <DailyLog.DayOffContent detailed />
                </div>
              </Modal.Content>

              <Modal.Actions>
                <Modal.CloseButton>
                  {'확인'}
                </Modal.CloseButton>
              </Modal.Actions>
            </DailyLog>
          </Modal>
        </>
      );
    }
  },
);

withModal.story = {
  name: 'withModal',
};

export default {
  title: 'component/DailyLog',
  component: docs.component,
  subcomponents: docs.subcomponents,
  parameters: { ...docs.parameters },
};
