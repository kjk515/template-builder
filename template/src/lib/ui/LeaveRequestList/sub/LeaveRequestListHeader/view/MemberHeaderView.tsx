
import React from 'react';
import { ReactComponent, autobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';
import { Grid } from '@nara.platform/react-ui';


interface Props {
  leaveCount: number;
  isPlan: boolean;
}

@autobind
@observer
class MemberHeaderView extends ReactComponent<Props> {
  //
  render() {

    const { leaveCount, isPlan } = this.props;

    return (
      <Grid className="info-section">
        <Grid.Row>
          <Grid.Column width={16} verticalAlign="middle">
            <div className="content-sub-info">
              <span className="count">&apos;{leaveCount}&apos;</span>건의 {isPlan ? '등록된 휴가가 있습니다.' : '휴가중/완료된 휴가가 있습니다.'}
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default MemberHeaderView;
