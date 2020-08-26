import React from 'react';
import { autobind, ReactComponent } from '@nara.platform/accent';
import { Grid, Header } from '@nara.platform/react-ui';
import { observer } from 'mobx-react';


interface Props {
  dayOffCount: number;
}


@autobind
@observer
class HeaderView extends ReactComponent<Props> {
  //
  render() {
    //
    const { dayOffCount } = this.props;
    return (
      <Header textAlign="left">
        <Grid>
          <Grid.Column>
            <Grid.Row>
              <h4>{`휴가자 입니다 (${dayOffCount}명)`}</h4>
            </Grid.Row>
          </Grid.Column>
        </Grid>
      </Header>
    );
  }
}

export default HeaderView;
