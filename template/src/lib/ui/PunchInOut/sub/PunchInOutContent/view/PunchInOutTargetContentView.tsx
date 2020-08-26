import React from 'react';
import { autobind, ReactComponent } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { Grid, NameTextModel } from '@nara.platform/react-ui';
import moment, { Moment } from 'moment';
import { DailyPunchModel, PunchInModel, PunchOutModel } from '~/lib/model';
import PunchInOutRowView from './PunchInOutRowView';
import PunchInOutActualTimeSetterView from './PunchInOutActualTimeSetterView';


interface Props {
  hourOption: NameTextModel[];
  minuteOption: NameTextModel[];
  dateOption: NameTextModel[];
  dailyPunch: DailyPunchModel;
  onChangeTargetDailyPunchProp: (name: string, value: any) => void;
  dailyPunchIndex: number;
  date: Date | Moment;
  getRowViewContent: (punch: PunchInModel | PunchOutModel, isActualTime?: boolean) => string;
  initTimeOptions: () => void;
  initActualTimeProps: () => void;
  onChangeTimeProps: (name: string, value: string, inOut: boolean) => void;
  clearActualTimeProps: () => void;
}

interface State {
  isActualTime: boolean;
  isPast: boolean;
}

@autobind
@observer
class PunchInOutTargetContentView extends ReactComponent<Props, State> {

  state = {
    isActualTime: false,
    isPast: false,
  };

  componentDidMount() {
    //
    const { initTimeOptions } = this.props;

    initTimeOptions();
    this.setDefaultIsActualTime();
  }

  setDefaultIsActualTime() {
    // if targetDailyPunch is in Past, should input actualTime and comment And Can't unCheck checkbox.
    const { date } = this.props;
    const today = moment();

    this.setState({
      isActualTime: !moment(date).isSame(today, 'D'),
      isPast: !moment(date).isSame(today, 'D'),
    });
  }

  changeActualTime(isActual: boolean) {
    this.setState({
      isActualTime: isActual,
    });
  }

  render() {
    const {
      hourOption, minuteOption, dateOption, dailyPunch, onChangeTargetDailyPunchProp,
      getRowViewContent, initActualTimeProps, onChangeTimeProps, clearActualTimeProps,
    } = this.props;
    const { isActualTime, isPast } = this.state;
    return (
      <div className="wrapper">
        <Grid columns={16}>
          <PunchInOutRowView
            gridTitle={!dailyPunch.isPunchOut ? '출근시간' : '퇴근시간'}
            gridContent={getRowViewContent(dailyPunch.isPunchOut && dailyPunch.punchOut ? dailyPunch.punchOut : dailyPunch.punchIn )}
            onCheck={this.changeActualTime}
            checkboxText={'시간 변경'}
            checkable={!isPast}
          />
          {
            isActualTime // TODO Fix condition name (ex. dailyPunch.~.time)
              && (
                <PunchInOutActualTimeSetterView
                  gridTitle={!dailyPunch.isPunchOut ? '실제 출근시간' : '실제 퇴근시간'}
                  dailyPunch={dailyPunch}
                  hourOption={hourOption}
                  minuteOption={minuteOption}
                  dateOption={dateOption}
                  onChangeTargetDailyPunchProp={onChangeTargetDailyPunchProp}
                  initActualTimeProps={initActualTimeProps}
                  onChangeTimeProps={onChangeTimeProps}
                  clearActualTimeProps={clearActualTimeProps}
                />
              )
          }
        </Grid>
      </div>
    );
  }
}

export default PunchInOutTargetContentView;
