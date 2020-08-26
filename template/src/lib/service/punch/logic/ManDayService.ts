
import { action, observable, runInAction } from 'mobx';
import { autobind, mobxService, CommandResponse, IdNameModel, NotInstantiatedException } from '@nara.platform/accent';

import _ from 'lodash';
import moment, { Moment } from 'moment';

import {
  DayOffModel,
  DayOnModel,
  ManDayModel,
  PunchInCdo,
  PunchInModel,
  PunchOutCdo,
  PunchOutModel,
} from '~/lib/model';
import ManDayFlowApi from '../apiclient/ManDayFlowApi';
import ManDayQueryApi from '../apiclient/ManDayQueryApi';


@autobind
@mobxService
class ManDayService {
  //
  static readonly instanceName = 'manDayService';
  static readonly serviceName = 'timecard.manDay.manDayService';
  static instance: ManDayService;

  private readonly manDayFlowApi: ManDayFlowApi;
  private readonly manDayQueryApi: ManDayQueryApi;

  private today = moment();

  @observable
  manDay: ManDayModel | null = null;

  constructor(
    manDayFlowApi: ManDayFlowApi = ManDayFlowApi.instance,
    manDayQueryApi = ManDayQueryApi.instance) {
    //
    this.manDayFlowApi = manDayFlowApi;
    this.manDayQueryApi = manDayQueryApi;
  }

  @action
  clearManDay(): void {
    //
    this.manDay = null;
  }

  @action
  newManDay() {
    //
    this.manDay = new ManDayModel();
  }

  @action
  newDayOn() {
    //
    if (!this.manDay) {
      throw new NotInstantiatedException('ManDayService', 'manDay');
    }
    this.manDay.dayOn = new DayOnModel();
  }

  @action
  newDayOff() {
    //
    if (!this.manDay) {
      throw new NotInstantiatedException('ManDayService', 'manDay');
    }
    this.manDay.dayOff = new DayOffModel();
  }

  @action
  setManDay(manDay: ManDayModel): void {
    //
    this.manDay = manDay;
  }

  @action
  setManDayProp(name: string, value: any): void {
    //
    if (!this.manDay) {
      throw new NotInstantiatedException('ManDayService', 'manDay');
    }
    this.manDay = _.set(this.manDay, name, value);
  }

  @action
  initPunchOut(punchType: 'punchIn' | 'punchOut') {
    //
    if (!this.manDay || !this.manDay.dayOn) {
      throw new NotInstantiatedException('ManDayService', 'manDay or manDay.dayon');
    }

    this.setManDayProp(`dayOn.dailyPunch.${punchType}.time`, this.today.format('HH:mm:ss'));
    this.setManDayProp(`dayOn.dailyPunch.${punchType}.actualTime`, this.today.format('HH:mm:ss'));

    navigator.geolocation.getCurrentPosition((position: Position) => {
      this.setManDayProp(`dayOn.dailyPunch.${punchType}.coordinate.longitude`, position.coords.longitude);
      this.setManDayProp(`dayOn.dailyPunch.${punchType}.coordinate.latitude`, position.coords.latitude);
    });
  }

  @action
  initManDay(member: IdNameModel, momentDate: Moment, projectDayId: string) {
    //
    if (!this.manDay) {
      throw new NotInstantiatedException('ManDayService', 'manDay');
    }

    const initManDay = new ManDayModel();

    initManDay.member = member;
    initManDay.projectDayId = projectDayId;

    initManDay.date = momentDate;

    runInAction(() => this.manDay = initManDay);

    this.newDayOn();
  }

  @action
  async findManDayById(manDayId: string): Promise<ManDayModel | null> {
    //
    const manDay = await this.manDayQueryApi.findManDay(manDayId);

    runInAction(() => this.manDay = manDay);
    return manDay;
  }

  @action
  async findManDayByMemberIdAndLocalDate(memberId: string, date: Moment): Promise<ManDayModel | null> {
    //
    const manDay = await this.manDayQueryApi.findManDayByMemberIdAndDate(memberId, date);

    runInAction(() => this.manDay = manDay);
    return manDay;
  }

  punchIn(manDayId: string, office: string, punchIn: PunchInModel, isTimeSet: boolean): Promise<CommandResponse> {
    //

    return this.manDayFlowApi.punchIn(manDayId, office, isTimeSet ? PunchInCdo.fromModel(punchIn) : PunchInCdo.fromModelWithOutTime(punchIn));
  }

  punchOut(manDayId: string, punchOut: PunchOutModel, isTimeSet: boolean): Promise<CommandResponse> {
    //
    return this.manDayFlowApi.punchOut(manDayId, isTimeSet ? PunchOutCdo.fromModel(punchOut) : PunchOutCdo.fromModelWithOutTime(punchOut));
  }
}

ManDayService.instance = new ManDayService();
export default ManDayService;

