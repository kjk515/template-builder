import React from 'react';
import { autobind, ReactComponent } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { Grid, Segment } from '@nara.platform/react-ui';
import { LeaveCategoryDisplayType, LeaveManDayModel } from '~/lib/model';
import DayOffContentRow from './DayOffContentRow';


interface Props {
  leaveManDays: LeaveManDayModel[];
}


@autobind
@observer
class DayOffContentView extends ReactComponent<Props> {
  //
  render() {
    //
    const { leaveManDays } = this.props;

    return (
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <Segment className="vacation-info">
              {
                leaveManDays && leaveManDays.length > 0
                && leaveManDays.map((leaveManDay, index) => (
                  <DayOffContentRow
                    key={index}
                    name={leaveManDay.member.name}
                    category={LeaveCategoryDisplayType[leaveManDay.category]}
                  />
                )) || '금일 휴가자 없음.'
              }
              {/*<Divider />*/}
              {/*<Link to="/"><b>00</b>건 휴가 신청 내역이 있습니다.</Link>*/}
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default DayOffContentView;
