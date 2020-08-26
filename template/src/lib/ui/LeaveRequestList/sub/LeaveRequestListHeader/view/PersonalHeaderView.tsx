
import React from 'react';
import { ReactComponent, autobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { Grid } from '@nara.platform/react-ui';
import { LeaveCountsRdo } from '~/lib/model';


interface Props {
  leaveSummary: LeaveCountsRdo;
}

@autobind
@observer
class HeaderView extends ReactComponent<Props> {
  //
  render() {

    const { leaveSummary } = this.props;

    return (
      <Grid className="info-section">
        <Grid.Row>
          <Grid.Column width={16}>
            <div className="content-sub-info state-info">
              <div>지급 연/월차 <span className="count">&apos;{leaveSummary.permitLeaves}&apos;</span>일</div>
              <span className="v-slash">|</span>
              <div>사용 연/월차 <span className="count">&apos;{leaveSummary.usedLeaves}&apos;</span>일</div>
              <span className="v-slash">|</span>
              <div>지급 보너스 휴가 <span className="count">&apos;{leaveSummary.permitAddedLeaves}&apos;</span>일</div>
              <span className="v-slash">|</span>
              <div>사용 보너스 휴가 <span className="count">&apos;{leaveSummary.totalUsedAddedLeaves}&apos;</span>일</div>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default HeaderView;
