import React, { ContextType } from 'react';
import { autobind, ReactComponent, ServiceInjector } from '@nara.platform/accent';
import { observer } from 'mobx-react';
import _ from 'lodash';
import { Moment } from 'moment';
import { ManDaysService } from '~/lib/service';
import PunchParams from '../../../model/PunchParams';
import MemberMonthlyPunchTimelineService from '../../../service/MemberMonthlyPunchTimelineService';
import HeaderView from '../view/HeaderView';
import ContentView from '../view/ContentView';
import MemberMonthlyPunchTimelineContext from '../../../context/MemberMonthlyPunchTimelineContext';


interface Props {
  onClickPunchInOut?: (params: PunchParams) => void;
  onClickPunchInOutTime?: (params: PunchParams) => void;
}

interface InjectedProps {
  manDaysService: ManDaysService;
  memberMonthlyPunchTimelineService: MemberMonthlyPunchTimelineService;
}

@autobind
@observer
class ContentContainer extends ReactComponent<Props, {}, InjectedProps> {
  //
  static defaultProps = {
    onClickPunchInOut: () => {},
    onClickPunchInOutTime: () => {},
  };

  static contextType = MemberMonthlyPunchTimelineContext;

  context!: ContextType<typeof MemberMonthlyPunchTimelineContext>;


  getHours(): number[] {
    //
    return _.range(0, 24, 1);
  }

  onClickPunchInOutTime(manDayId: string, date: Moment) {
    //
    const { onClickPunchInOutTime } = this.props;

    if (onClickPunchInOutTime) {
      onClickPunchInOutTime({ manDayId, date });
    }
  }

  onClickPunchInOut(manDayId: string, date: Moment) {
    //
    const { onClickPunchInOut } = this.props;

    if (onClickPunchInOut) {
      onClickPunchInOut({ manDayId, date });
    }
  }

  render() {
    //
    const { manDaysService, memberMonthlyPunchTimelineService } = this.injected;
    const { manDays } = manDaysService;
    const { date } = memberMonthlyPunchTimelineService;

    const { personal } = this.context.punchTimeLine;

    return (
      <>
        <HeaderView text={date} />

        <ContentView
          personal={personal}
          hours={this.getHours()}
          manDays={manDays}
          onClickPunchInOut={this.onClickPunchInOut}
          onClickPunchInOutTime={this.onClickPunchInOutTime}
        />
      </>
    );
  }
}

export default ServiceInjector.useContext(
  ManDaysService,
  MemberMonthlyPunchTimelineService,
)(ContentContainer);

