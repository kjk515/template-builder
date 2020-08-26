
import { observable } from 'mobx';
import { autobind, mobxService } from '@nara.platform/accent';
import DataHandlingApi from '../apiclient/DataHandlingApi';


@autobind
@mobxService
class DataHandlingService {
  //
  static readonly instanceName = 'dataHandlingService';
  static instance: DataHandlingService;

  private readonly dataHandlingApi: DataHandlingApi;

  @observable
  manDayId: string = '';

  constructor(dataHandlingApi: DataHandlingApi = DataHandlingApi.instance) {
    //
    this.dataHandlingApi = dataHandlingApi;
  }

  onClickClearData(): void {
    //
    this.dataHandlingApi.clearTestDate();
  }

  onClickClearTodayData(): void {
    //

  }

  onClickInitData(): void {
    //
    this.dataHandlingApi.makeTestData();
  }

}

DataHandlingService.instance = new DataHandlingService(DataHandlingApi.instance);

export default DataHandlingService;
