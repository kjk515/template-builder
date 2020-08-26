
import React from 'react';
import { ReactComponent, autobind } from '@nara.platform/accent';

import { Icon, SemanticWIDTHSNUMBER } from '@nara.platform/react-ui';
import { PanelSubFields } from '~/lib/ui/shared';


interface Props {
  width?: SemanticWIDTHSNUMBER;
}

@autobind
class PanelSubFieldsManDayLabelsView extends ReactComponent<Props> {
  //
  getWidth(): SemanticWIDTHSNUMBER {
    //
    return this.props.width || 8;
  }

  render() {
    //
    return (
      <PanelSubFields.LabelGroup
        className="icon-info"
        width={this.getWidth()}
        textAlign="right"
      >
        <PanelSubFields.Label
          content={
            <><Icon className="check" color="black" />근무</>
          }
        />
        <PanelSubFields.Label
          content={
            <><Icon className="vacation" />휴가</>
          }
        />
        <PanelSubFields.Label
          content={
            <><Icon className="icon-half" />반차</>
          }
        />
      </PanelSubFields.LabelGroup>
    );
  }
}
export default PanelSubFieldsManDayLabelsView;

