
import { action, observable, runInAction } from 'mobx';
import { autobind, mobxService } from '@nara.platform/accent';
import { Moment } from 'moment';

import { ManMonthModel } from '~/lib/model';
import ManDayQueryApi from '../apiclient/ManDayQueryApi';


@autobind
@mobxService
class ManMonthService {
  //
  static readonly instanceName = 'manMonthService';
  static readonly serviceName = 'timecard.manMonth.manMonthService';
  static instance: ManMonthService;

  private readonly manDayQueryApi: ManDayQueryApi;


  @observable
  manMonth: ManMonthModel | null = null;

  constructor(manDayQueryApi: ManDayQueryApi = ManDayQueryApi.instance) {
    this.manDayQueryApi = manDayQueryApi;
  }

  @action
  async findManMonthByMemberIdAndYearMonth(memberId: string, yearMonth: Moment): Promise<ManMonthModel | null> {
    //
    const manMonth = await this.manDayQueryApi.findManMonthByMemberIdAndYearMonth(memberId, yearMonth);

    runInAction(() => this.manMonth = manMonth);

    return manMonth;
  }
}

ManMonthService.instance = new ManMonthService();
export default ManMonthService;
