
import React from 'react';
import { ReactComponent, autobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import PanelSubFieldsLabel from '../PanelSubFieldsLabel';


interface Props {
  label: React.ReactNode;
  count: number;
  countingUnit: string;
  iconName?: string;
  divider?: string;
}

@autobind
@observer
class PanelSubFieldsCountLabelView extends ReactComponent<Props> {
  //
  static defaultProps = {
    iconName: undefined,
    divider: undefined,
  };


  render() {
    //
    const { iconName, label, count, countingUnit, divider } = this.props;

    return (
      <PanelSubFieldsLabel
        iconName={iconName}
        divider={divider}
        content={
          <>
            {label}
            <span className="count"> {count ? `'${count}'` : `'00'`}</span>
            {countingUnit}
          </>
        }
      />
    );
  }
}

export default PanelSubFieldsCountLabelView;
