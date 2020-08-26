
import React from 'react';
import { ReactComponent, autobind } from '@nara.platform/accent';

import { PanelSubFields } from '~/lib/ui/shared';


@autobind
class CalendarLabelContainer extends ReactComponent {
  //
  render() {
    //
    return (
      <PanelSubFields>
        <PanelSubFields.LabelGroup className="icon-info" textAlign="right">
          <PanelSubFields.Label
            content={(
              <><div className="rectangle orange" />휴가</>
            )}
          />
          <PanelSubFields.Label
            content={(
              <><div className="rectangle blue" />출/퇴근</>
            )}
          />
        </PanelSubFields.LabelGroup>
      </PanelSubFields>
    );
  }
}

export default CalendarLabelContainer;
