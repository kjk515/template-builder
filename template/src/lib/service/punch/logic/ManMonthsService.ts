
import { action, observable, runInAction } from 'mobx';
import { autobind, mobxService, Offset, OffsetElementList } from '@nara.platform/accent';
import { Moment } from 'moment';

import { ManMonthModel } from '~/lib/model';
import ManDayQueryApi from '../apiclient/ManDayQueryApi';


@autobind
@mobxService
class ManMonthsService {
  //
  static readonly instanceName = 'manMonthsService';
  static readonly serviceName = 'timecard.manMonth.manMonthsService';
  static instance: ManMonthsService;

  private readonly manDayQueryApi: ManDayQueryApi;

  @observable
  manMonths: ManMonthModel[] = [];

  @observable
  totalCount: number = 0;


  constructor(manDayQueryApi: ManDayQueryApi = ManDayQueryApi.instance) {
    this.manDayQueryApi = manDayQueryApi;
  }

  @action
  async findManMonthsByProjectIdAndYearMonthAndOffset(
    projectId: string,
    date: Moment,
    offset: Offset
  ): Promise<OffsetElementList<ManMonthModel>> {
    //
    const manMonths = await this.manDayQueryApi.findManMonthsByProjectIdAndYearMonthAndOffset(projectId, date, offset);

    runInAction(() => {
      this.manMonths = ManMonthModel.fromDomains(manMonths.results);
      this.totalCount = manMonths.totalCount;
    });

    return manMonths;
  }
}

ManMonthsService.instance = new ManMonthsService();
export default ManMonthsService;
