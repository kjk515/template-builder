
import React from 'react';
import { autobind, ReactComponent, DatePeriodModel } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { Grid, Segment } from '@nara.platform/react-ui';
import { LeaveCategoryDisplayType, LeaveManDayModel } from '~/lib/model';
import DayOffContentRow from './DayOffContentRow';


interface Props {
  leaveManDays: LeaveManDayModel[];
}


@autobind
@observer
class DayOffContentDetailView extends ReactComponent<Props> {
  //
  readonly ONE_DAY_SECONDS = 1000 * 60 * 60 * 24;

  periodDisplay(period: DatePeriodModel | null) {
    const result = {
      detailPeriod: '',
      detailCount: 0,
    };

    if (period) {
      result.detailPeriod = period.toDisplay();
      result.detailCount = (period.endDateAsTime - period.startDateAsTime) / this.ONE_DAY_SECONDS + 1;
    }
    return result;
  }

  render() {
    //
    const { leaveManDays } = this.props;
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <Segment className="vacation-info">
              {
                leaveManDays && leaveManDays.length ?
                  leaveManDays.map((leaveManDay, index) => (
                    <DayOffContentRow
                      key={index}
                      name={leaveManDay.member.name}
                      detail={this.periodDisplay(leaveManDay.period)}
                      category={leaveManDay.category ? LeaveCategoryDisplayType[leaveManDay.category] : null}
                    />
                  ))
                  : '금일 휴가자 없음.'
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

export default DayOffContentDetailView;
