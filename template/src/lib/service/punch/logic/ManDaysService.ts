
import { action, runInAction } from 'mobx';
import { autobind, mobxService, observableArray } from '@nara.platform/accent';

import moment, { Moment } from 'moment';
import { ManDayModel } from '~/lib/model';
import ManDayQueryApi from '../apiclient/ManDayQueryApi';


@autobind
@mobxService
class ManDaysService {
  //
  static readonly instanceName = 'manDaysService';
  static readonly serviceName = 'timecard.manDay.manDaysService';
  static instance: ManDaysService;

  private readonly manDayQueryApi: ManDayQueryApi;

  @observableArray
  manDays: ManDayModel[] = [];

  constructor(manDayQueryApi: ManDayQueryApi = ManDayQueryApi.instance) {
    this.manDayQueryApi = manDayQueryApi;
  }

  @action
  clearManDays(): void {
    //
    this.manDays = [];
  }

  @action
  async findManDaysByMemberIdAndYearMonth(memberId: string, date: Moment): Promise<ManDayModel[]> {
    //
    const manDays = await this.manDayQueryApi.findManDaysByMemberIdAndYearMonth(memberId, date);

    runInAction(() => this.manDays = manDays);
    return manDays;
  }


  @action
  sortManDaysByDateDescending(manDays: ManDayModel[]) {
    //
    const sortedManDays = manDays.sort((a, b) => b.date!.date() - a.date!.date());

    this.manDays = sortedManDays.filter(manDay => manDay.date!.isBefore(moment()));
  }
}

ManDaysService.instance = new ManDaysService();
export default ManDaysService;
