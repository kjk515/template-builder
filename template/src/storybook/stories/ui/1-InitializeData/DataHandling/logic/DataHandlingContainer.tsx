
import React from 'react';
import { autobind, ReactComponent, ServiceInjector } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { dialog } from '@nara.platform/react-ui';
import moment, { Moment } from 'moment';
import { ManDayTestService } from '~/lib/service';
import DataHandlingView from '../view/DataHandlingView';
import DataHandlingService from '../service/logic/DataHandlingService';


interface State {
  date: Moment;
}

interface InjectedProps {
  manDayTestService: ManDayTestService;
  dataHandlingService: DataHandlingService;
}

@autobind
@observer
class DataHandlingContainer extends ReactComponent<{}, State, InjectedProps> {
  //
  state: State = {
    date: moment(),
  };


  removeTodayManDay(): void {
    //
    const { manDayTestService } = this.injected;
    const { date } = this.state;

    manDayTestService.removeManDayByLocalDate(date.format('YYYY-MM-DD'));
  }

  async onClickClearData() {
    //
    const { dataHandlingService } = this.injected;

    const confirmed = await dialog.confirm({
      title: '데이터 삭제',
      message: '모든 데이터를 삭제합니다.',
    });

    if (confirmed) {
      dataHandlingService.onClickClearData();
    }
  }

  async onClickInitData() {
    //
    const { dataHandlingService } = this.injected;

    const confirmed = await dialog.confirm({
      title: '데이터 초기화',
      message: '모든 데이터를 초기화 합니다.',
    });

    if (confirmed) {
      dataHandlingService.onClickInitData();
    }
  }

  onChangeDate(date: Moment): void {
    //
    this.setState({ date: moment(date) });
  }


  render() {
    //
    const { date } = this.state;

    return (
      <DataHandlingView
        date={date}
        onClickClearData={this.onClickClearData}
        onClickClearTodayData={this.removeTodayManDay}
        onClickInitData={this.onClickInitData}
        onChangeDate={this.onChangeDate}
      />
    );
  }
}

export default ServiceInjector.with(
  DataHandlingService,
  ManDayTestService,
)(DataHandlingContainer);
