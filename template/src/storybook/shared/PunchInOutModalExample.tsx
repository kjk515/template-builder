
import React from 'react';
import { ReactComponent, autobind, injectFromName, NaraService } from '@nara.platform/accent';
import { observer } from 'mobx-react';
import { storyLogger } from '@nara.platform/storybook';

import moment from 'moment';
import { ModalContextProps, Button, Modal } from '@nara.platform/react-ui';
import { PunchInOut } from '~/lib/ui';


interface InjectedProps {
  naraService: NaraService;
}

@injectFromName(NaraService.serviceName)
@autobind
@observer
class PunchInOutModalExample extends ReactComponent<{}, {}, InjectedProps> {
  //
  private today = moment().format('YYYY-MM-DD (dddd)');


  onSuccess(close: () => void): void {
    //
    storyLogger(PunchInOut, 'onSuccess, 출/퇴근 완료');
    close();
  }

  render() {
    //
    const { patronName } = this.injected.naraService;

    return (
      <Modal
        size="small"
        className="base"
        trigger={<Button primary size="tiny">출/퇴근</Button>}
      >
        {(context: ModalContextProps) => (
          <>
            <Modal.Header>
              Punch In/Out
              <p>{this.today}</p>
            </Modal.Header>
            <PunchInOut>
              <Modal.Content>
                <div className="simple">
                  <PunchInOut.Header
                    text={`안녕하세요! ${patronName}님`}
                  />
                  <PunchInOut.Content />
                </div>
              </Modal.Content>
              <Modal.Actions>
                <Modal.CloseButton />
                <PunchInOut.ConfirmButton
                  onSuccessPunchIn={() => this.onSuccess(context.close)}
                  onSuccessPunchOut={() => this.onSuccess(context.close)}
                />
              </Modal.Actions>
            </PunchInOut>
          </>
        )}
      </Modal>
    );
  }
}

export default PunchInOutModalExample;
