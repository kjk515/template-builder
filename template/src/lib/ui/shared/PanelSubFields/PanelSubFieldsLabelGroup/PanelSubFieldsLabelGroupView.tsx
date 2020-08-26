
import React from 'react';
import { ReactComponent, autobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { Grid } from '@nara.platform/react-ui';


interface Props {
  children: React.ReactNode;
  className?: 'state-info' | 'icon-info' | string;
  textAlign?: 'left' | 'center' | 'right';
  verticalAlign?: 'middle' | 'top' | 'bottom';
  width?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16;
}

@autobind
@observer
class PanelSubFieldsLabelGroupView extends ReactComponent<Props> {
  //
  static defaultProps = {
    className: '',
    textAlign: 'left',
    verticalAlign: 'middle',
    width: undefined,
  };


  render() {
    //
    const { className, width, textAlign, verticalAlign, children } = this.props;

    return (
      <Grid.Column width={width} textAlign={textAlign} verticalAlign={verticalAlign}>
        <div className={`content-sub-info ${className}`}>
          {children}
        </div>
      </Grid.Column>
    );
  }
}

export default PanelSubFieldsLabelGroupView;
