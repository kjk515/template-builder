
import { autobind, mobxService, NotInstantiatedException, observableArray } from '@nara.platform/accent';

import { action, observable } from 'mobx';
import _ from 'lodash';
import moment from 'moment';

import { DailyPunchModel, PunchOutModel, PunchInModel } from '~/lib/model';


@autobind
@mobxService
class DailyPunchesService {
  //
  static readonly instanceName = 'dailyPunchesService';
  static readonly serviceName = 'timecard.dailypunch.dailyPunchesService';
  static instance: DailyPunchesService;

  @observableArray
  dailyPunches: DailyPunchModel[] = [];

  @observable
  targetDailyPunch: DailyPunchModel | null = null;

  @action
  clearDailyPunches(): void {
    //
    this.dailyPunches = [];
  }

  @action
  clearTargetDailyPunch(): void {
    //
    this.targetDailyPunch = new DailyPunchModel();
  }

  @action
  setDailyPunchesProps(index: number, name: string, value: any): void {
    //
    if (!this.dailyPunches[index]) {
      throw new NotInstantiatedException('DailyPunchesService', `dailyPunches[${index}].dailyPunch`);
    }

    this.dailyPunches[index] = _.set(this.dailyPunches[index], name, value);
  }

  @action
  setTargetDailyPunchProps(name: string, value: any): void {
    //
    if (!this.targetDailyPunch) {
      throw new NotInstantiatedException('DailyPunchesService', `newDailyPunch`);
    }
    this.targetDailyPunch = _.set(this.targetDailyPunch, name, value);
  }

  @action
  initTargetDailyPunch(dailyPunch?: DailyPunchModel): void {
    //
    const targetDailyPunch = new DailyPunchModel();

    if (dailyPunch) {
      Object.assign(targetDailyPunch, dailyPunch);
      targetDailyPunch.punchOut = new PunchOutModel();
    }
    else {
      targetDailyPunch.punchIn = new PunchInModel();
    }

    this.targetDailyPunch = targetDailyPunch;
  }

  getTimeNow() {
    return moment().format('HH:mm');
  }

  @action
  setDailyPunches(punches: DailyPunchModel[]) {
    this.dailyPunches = punches;
  }

}

DailyPunchesService.instance = new DailyPunchesService();
export default DailyPunchesService;

