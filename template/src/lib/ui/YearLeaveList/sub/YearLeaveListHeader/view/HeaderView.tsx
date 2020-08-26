
import React from 'react';
import { ReactComponent, autobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';
import { Grid } from '@nara.platform/react-ui';


interface Props {
  count: number;
}

@autobind
@observer
class HeaderView extends ReactComponent<Props> {
  //
  render() {
    const { count } = this.props;

    return (
      <Grid className="info-section">
        <Grid.Row>
          <Grid.Column width={16} verticalAlign="middle">
            <div className="content-sub-info">
              <span><span className="count">&apos; { count } &apos;</span> 명의 멤버가 있습니다.</span>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default HeaderView;
