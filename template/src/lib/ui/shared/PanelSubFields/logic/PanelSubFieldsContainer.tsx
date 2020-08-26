
import React from 'react';
import { ReactComponent, autobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { Grid } from '@nara.platform/react-ui';


interface Props {
  children: React.ReactNode;
  className?: string;
}

@autobind
@observer
class PanelSubFieldsContainer extends ReactComponent<Props> {
  //
  static defaultProps = {
    className: '',
  };


  render() {
    //
    const { className, children } = this.props;

    return (
      <Grid className={`info-section ${className}`}>
        <Grid.Row>
          {children}
        </Grid.Row>
      </Grid>
    );
  }
}

export default PanelSubFieldsContainer;
