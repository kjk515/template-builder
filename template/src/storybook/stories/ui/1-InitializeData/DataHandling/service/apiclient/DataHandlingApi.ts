
import { axiosApi } from '@nara.platform/accent';


class DataHandlingApi {
  //
  static instance: DataHandlingApi;

  baseUrl = '/api/timecard/test-flow/test-data';


  makeTestData(): void {
    //
    axiosApi.post(`${this.baseUrl}/make-test-data/`)
      .then((response) => response && response.status === 200 && console.log('Success'))
      .catch((reason) => console.log('error: ', reason));
  }

  clearTestDate(): void {
    //
    axiosApi.post(`${this.baseUrl}/clear-test-data/`)
      .then((response) => response && response.status === 200 && console.log('Success'))
      .catch((reason) => console.log('error: ', reason));
  }
}


DataHandlingApi.instance = new DataHandlingApi();

export default DataHandlingApi;
