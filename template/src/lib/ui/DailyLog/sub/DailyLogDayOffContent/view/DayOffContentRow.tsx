import React from 'react';
import { autobind, ReactComponent } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { Grid } from '@nara.platform/react-ui';


interface Props {
  name: string;
  detail?: {
    detailPeriod: string;
    detailCount: number;
  };
  category?: string | null;
}

@autobind
@observer
class DayOffContentRow extends ReactComponent<Props> {
  //
  render() {
    //
    const { name, detail, category } = this.props;

    return (
      <Grid.Row>
        <Grid>
          <Grid.Column width={3}>
            {name}
          </Grid.Column>
          {
            detail && detail.detailPeriod ?
              <>
                <Grid.Column width={7}>
                  {detail.detailPeriod}
                </Grid.Column>
                <Grid.Column width={3}>
                  {detail.detailCount}일
                </Grid.Column>
              </>
              :
              null
          }
          {
            category ?
              <Grid.Column width={3}>
                {category}
              </Grid.Column>
              :
              null
          }
        </Grid>
      </Grid.Row>
    );
  }
}

export default DayOffContentRow;
