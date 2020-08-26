
import React from 'react';
import { ReactComponent, autobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { Grid, Header } from '@nara.platform/react-ui';


interface Props {
  title: string;
  headerClassName: string;
}

@autobind
@observer
class ContentHeaderRow extends ReactComponent<Props> {
  //
  render() {
    //
    const { title, headerClassName } = this.props;

    return (
      <Grid.Row>
        <Grid.Column>
          <Header dividing className={headerClassName}>{title}</Header>
        </Grid.Column>
      </Grid.Row>
    );
  }
}

export default ContentHeaderRow;
