import { ApiClient, axiosApi, CommandResponse } from '@nara.platform/accent';
import { PunchInCdo, PunchOutCdo } from '~/lib/model';
import { PunchInCommand, PunchOutCommand } from '~/lib/service/punch/apiclient/command';


class ManDayFlowApi {
  //
  static readonly instance = new ManDayFlowApi();

  private baseUrl = ''; // TODO remove after merge
  private client = new ApiClient('/api/timecard/punch-', { resDataName: 'response' });


  async punchIn(manDayId: string, office: string, punchIn: PunchInCdo): Promise<CommandResponse> {
    //
    const punchInCommand = PunchInCommand.new(manDayId, office, punchIn);
    return this.client.postNotNull<CommandResponse>(CommandResponse, 'custom/man-day/punch-in', punchInCommand);
  }

  async punchOut(manDayId: string, punchOut: PunchOutCdo): Promise<CommandResponse> {
    //
    const punchOutCommand = PunchOutCommand.new(manDayId, punchOut);
    return this.client.postNotNull<CommandResponse>(CommandResponse, 'custom/man-day/punch-out', punchOutCommand);
  }

  removeManDayByLocalDate(localDate: string) {
    //
    axiosApi.delete(this.baseUrl + `/byLocalDate/${localDate}`)
      .then((response) => response && response.status === 200 && console.log('Success'))
      .catch((reason) => console.log('error: ', reason));
  }

  makeTestData(): void {
    //
    axiosApi.post(this.baseUrl + `/testData`)
      .then((response) => response && response.status === 200 && console.log('Success'))
      .catch((reason) => console.log('error: ', reason));
  }

  clearTestDate(): void {
    //
    axiosApi.delete(this.baseUrl + `/clearTestData`)
      .then((response) => response && response.status === 200 && console.log('Success'))
      .catch((reason) => console.log('error: ', reason));
  }
}

export default ManDayFlowApi;
