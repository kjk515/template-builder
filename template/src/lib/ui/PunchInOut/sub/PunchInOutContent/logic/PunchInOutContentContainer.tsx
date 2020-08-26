import React from 'react';
import { autobind, ReactComponent, ServiceInjector } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import moment from 'moment';

import { DailyPunchesService, ManDayService } from '~/lib/service';
import { PunchInModel, PunchOutModel } from '~/lib/model';

import PunchInOutContentView from '../view/PunchInOutContentView';
import PunchInOutTargetContentView from '../view/PunchInOutTargetContentView';
import PunchInOutService from '../../../service/PunchInOutService';
import PunchInOutRowView from '../view/PunchInOutRowView';


interface Props {
  history?: boolean;
}

interface InjectedProps {
  manDayService: ManDayService;
  punchInOutService: PunchInOutService;
  dailyPunchesService: DailyPunchesService;
}

@observer
@autobind
class PunchInOutContentContainer extends ReactComponent<Props, {}, InjectedProps> {
  //
  componentDidMount() {
    //
    this.initTimeOptions();
  }

  initTimeOptions() {
    const { punchInOutService, manDayService } = this.injected;
    const { manDay } = manDayService;

    punchInOutService.setBaseDate(manDay ? moment(manDay.date) : moment());
    punchInOutService.makeHourOption();
    punchInOutService.makeMinuteOption();
    punchInOutService.makeDateOption();
  }

  onChangeTargetDailyPunchProp(name: string, value: any) {
    //
    const { dailyPunchesService } = this.injected;

    dailyPunchesService.setTargetDailyPunchProps(name, value);
  }

  onChangeTimeProps(name: string, value: string, inOut: boolean) {
    //
    const { punchInOutService, dailyPunchesService } = this.injected;

    switch (name) {
      case 'date':
        punchInOutService.setDate(value);
        break;
      case 'hour':
        punchInOutService.setHour(value);
        break;
      case 'minute':
        punchInOutService.setMinute(value);
        break;
    }
    if (inOut) {
      dailyPunchesService.setTargetDailyPunchProps('punchIn.time', punchInOutService.time);
    }
    else {
      dailyPunchesService.setTargetDailyPunchProps('punchOut.time', punchInOutService.time);
    }
  }

  getRowViewContent(punch: PunchInModel | PunchOutModel, isDiffActual?: boolean): string {
    //
    if (!punch) {
      return '시간이 기록되지 않았습니다.';
    }

    else if (isDiffActual) {
      return moment(punch.time).format('HH:mm (YYYY-MM-DD)');
    }
    else {
      return moment(punch.punchTime).format('HH:mm (YYYY-MM-DD)');
    }
  }

  initActualTimeProps() {
    //
    const { punchInOutService, dailyPunchesService } = this.injected;
    const { initTimeProps } = punchInOutService;
    const { targetDailyPunch } = dailyPunchesService;

    initTimeProps();

    if (!targetDailyPunch) {
      return;
    }

    if (!targetDailyPunch.isPunchOut) {
      dailyPunchesService.setTargetDailyPunchProps('punchIn.time', punchInOutService.time);
    }
    else {
      dailyPunchesService.setTargetDailyPunchProps('punchOut.time', punchInOutService.time);
    }
  }

  clearActualTimeProps() {
    //
    const { punchInOutService, dailyPunchesService } = this.injected;
    const { clearAllSelectedTimeProps } = punchInOutService;
    const { targetDailyPunch } = dailyPunchesService;

    clearAllSelectedTimeProps();

    if (!targetDailyPunch) {
      return;
    }
    if (!targetDailyPunch.isPunchOut) {
      dailyPunchesService.setTargetDailyPunchProps('punchIn.time', null);
      dailyPunchesService.setTargetDailyPunchProps('punchIn.comment', '');
    }
    else {
      dailyPunchesService.setTargetDailyPunchProps('punchOut.time', null);
      dailyPunchesService.setTargetDailyPunchProps('punchOut.comment', '');
    }

  }

  render() {
    //
    const { history } = this.props;
    const { manDayService, punchInOutService, dailyPunchesService } = this.injected;
    const { manDay } = manDayService;
    const { hourOption, minuteOption, dateOption } = punchInOutService;
    const { dailyPunches, targetDailyPunch } = dailyPunchesService;

    if (history) {
      return (
        manDay && dailyPunches && dailyPunches.length > 0 ?
          dailyPunches.map((dailyPunch, index) => (
            <PunchInOutContentView
              dailyPunch={dailyPunch}
              key={index}
              date={moment(manDay.date)}
              getRowViewContent={this.getRowViewContent}
            />
          ))
          :
          <div className="wrapper">
            <PunchInOutRowView gridTitle={''} gridContent={'출퇴근 내역이 없습니다'} />
          </div>
      );
    }
    else {
      return (
      //new dailyPunch or punchOut Latest dailyPunch
        targetDailyPunch && manDay ?
          <>
            {
            targetDailyPunch.isPunchOut
            && (
              <PunchInOutContentView
                dailyPunch={targetDailyPunch}
                key={targetDailyPunch.id}
                date={moment(manDay.date)}
                getRowViewContent={this.getRowViewContent}
              />
            )
          }
            <PunchInOutTargetContentView
              hourOption={hourOption}
              minuteOption={minuteOption}
              dateOption={dateOption}
              dailyPunch={targetDailyPunch}
              onChangeTargetDailyPunchProp={this.onChangeTargetDailyPunchProp}
              key={dailyPunches.length}
              dailyPunchIndex={dailyPunches.length}
              date={moment(manDay.date)}
              getRowViewContent={this.getRowViewContent}
              initTimeOptions={this.initTimeOptions}
              initActualTimeProps={this.initActualTimeProps}
              onChangeTimeProps={this.onChangeTimeProps}
              clearActualTimeProps={this.clearActualTimeProps}
            />
          </>
          :
          null
      );
    }
  }
}

export default ServiceInjector.useContext(
  ManDayService,
  PunchInOutService,
  DailyPunchesService
)(PunchInOutContentContainer);
