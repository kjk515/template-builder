
import React from 'react';
import { ReactComponent, autobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { Icon } from '@nara.platform/react-ui';


interface Props {
  content: React.ReactNode;
  iconName?: string;
  count?: number;
  countingUnit?: string;
  divider?: string;
}

@autobind
@observer
class PanelSubFieldsLabelView extends ReactComponent<Props> {
  //
  static defaultProps = {
    iconName: undefined,
    count: undefined,
    countingUnit: undefined,
    divider: undefined,
  };


  render() {
    //
    const { iconName, content, count, countingUnit, divider } = this.props;

    return (
      <>
        <div>
          {iconName && <Icon className={iconName} />}
          {content}
          { typeof count === 'number' && (
            <>
              <span className="count"> {count ? `'${count}'` : `'00'`}</span>
              {countingUnit}
            </>
          )}
        </div>

        { divider && (
          <span className="v-slash">{divider}</span>
        )}
      </>
    );
  }
}

export default PanelSubFieldsLabelView;
