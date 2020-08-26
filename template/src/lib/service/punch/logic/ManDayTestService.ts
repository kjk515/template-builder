
import { autobind, mobxService } from '@nara.platform/accent';
import ManDayFlowApi from '../apiclient/ManDayFlowApi';


@autobind
@mobxService
class ManDayTestService {
  //
  static readonly instanceName = 'manDayTestService';
  static readonly serviceName = 'timecard.manDay.manDayTestService';
  static instance: ManDayTestService;

  private readonly manDayFlowApi: ManDayFlowApi;


  constructor(manDayFlowApi: ManDayFlowApi = ManDayFlowApi.instance) {
    this.manDayFlowApi = manDayFlowApi;
  }

  clearTestDate(): void {
    //
    this.manDayFlowApi.clearTestDate();
  }

  removeManDayByLocalDate(localDate: string) {
    //
    this.manDayFlowApi.removeManDayByLocalDate(localDate);
  }

  makeTestData(): void {
    //
    this.manDayFlowApi.makeTestData();
  }
}

ManDayTestService.instance = new ManDayTestService();
export default ManDayTestService;
